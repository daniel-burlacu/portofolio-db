'use client';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useChatUI } from "./ChatProvider";
import { SYSTEM_PROMPT } from "@/data/recruiterPromt";
import { saveQA, exportQA } from '@/data/lib/qaLocal';

/** ---- Lightweight types to avoid `any` ---- **/

type Role = "user" | "assistant" | "assistant_stream";
type Msg = { role: Role; content: string };

// Stream delta chunk shape (minimal subset we actually read)
type ChatDelta = {
    choices?: Array<{ delta?: { content?: string } }>;
};

// Non-stream response (we don’t use it, but keep to satisfy the signature)
type NonStreamResponse = {
    choices?: Array<{ message?: { content?: string } }>;
};

// Messages passed to the engine
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

// The engine surface we use (narrowed to what this component calls)
type ChatEngine = {
    chat: {
        completions: {
            create: (args: {
                messages: ChatMessage[];
                stream?: boolean;
                temperature?: number;
                top_p?: number;
            }) => Promise<AsyncIterable<ChatDelta> | NonStreamResponse>;
        };
    };
};

const MODEL_ID = "Qwen2.5-3B-Instruct-q4f16_1-MLC"; // smaller & faster first-load

export default function GenieChatPanel() {
    const { open, setOpen, ready, setReady } = useChatUI();
    const [bootMsg, setBootMsg] = useState("Loading AI in your browser… (first load can take 10–30s)");
    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState<Msg[]>([
        { role: "assistant", content: "Hi! Paste a job description or ask if Daniel fits a role." }
    ]);
    const engineRef = useRef<ChatEngine | null>(null);
    const [webgpuOK, setWebgpuOK] = useState<boolean | null>(null);

    useEffect(() => {
        if (!open || ready) return;
        const hasWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;
        setWebgpuOK(hasWebGPU);

        (async () => {
            try {
                // Create and warm the engine
                const engine = (await CreateMLCEngine(MODEL_ID)) as unknown as ChatEngine;
                engineRef.current = engine;

                await engineRef.current.chat.completions.create({
                    messages: [
                        { role: "system", content: "ping" },
                        { role: "user", content: "hi" }
                    ],
                    stream: false,
                    temperature: 0.0
                });

                setReady(true);
                setBootMsg("Ready.");
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                setBootMsg(`Could not start local model: ${msg}`);
            }
        })();
    }, [open, ready, setReady]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "g") setOpen(!open); // ⌘/Ctrl + G
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, setOpen]);

    const ask = async () => {
        if (!input.trim() || !ready || !engineRef.current) return;

        const userMsg: Msg = { role: "user", content: input.trim() };
        setMsgs((m) => [...m, userMsg]);
        setInput("");

        const prompt: ChatMessage[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...msgs.map(({ role, content }) => ({
                role: role === "assistant_stream" ? "assistant" : role,
                content
            })),
            userMsg
        ] as ChatMessage[];

        let answer = "";
        try {
            const res = await engineRef.current.chat.completions.create({
                messages: prompt,
                stream: true,
                temperature: 0.1,
                top_p: 0.9
            });

            // Type guard to ensure we iterate only if it's a stream
            if (Symbol.asyncIterator in (res as AsyncIterable<ChatDelta>)) {
                for await (const chunk of res as AsyncIterable<ChatDelta>) {
                    const delta = chunk?.choices?.[0]?.delta?.content;
                    if (!delta) continue;
                    answer += delta;

                    setMsgs((m) => {
                        const copy = [...m];
                        if (copy[copy.length - 1]?.role === "assistant_stream") {
                            copy[copy.length - 1] = { role: "assistant_stream", content: answer };
                        } else {
                            copy.push({ role: "assistant_stream", content: answer });
                        }
                        return copy;
                    });
                }
            }

            setMsgs((m) => {
                const copy = [...m];
                const idx = copy.findIndex((x) => x.role === "assistant_stream");
                if (idx > -1) copy[idx] = { role: "assistant", content: answer };
                return copy;
            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setMsgs((m) => [...m, { role: "assistant", content: `Error generating reply: ${msg}` }]);
        }
        // NEW: persist this exchange
        saveQA({ q: userMsg.content, a: answer, ts: Date.now() });
        // Also send to server (best-effort; ignore errors)
fetch("/api/qa", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ q: userMsg.content, a: answer, ts: Date.now() }),
}).catch(() => {});
    };



    if (!open) return null;

    return createPortal(
        <Paper
            elevation={8}
            sx={{
                position: "fixed",
                right: 24,
                bottom: 92,
                zIndex: 1500,
                width: 420,
                maxWidth: "95vw",
                borderRadius: 3,
                p: 1.5
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Daniel’s AI Assistant
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            const blob = new Blob([exportQA()], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `qa-history-${new Date().toISOString()}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                    >
                        Export
                    </Button>

                    <IconButton size="small" onClick={() => setOpen(false)} aria-label="close">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>

            <Box
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 1.25,
                    height: 360,
                    overflow: "auto",
                    mb: 1.25
                }}
            >
                <Stack spacing={1}>
                    {msgs.map((m, i) => (
                        <Box key={i} sx={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: m.role === "user" ? "primary.main" : "background.default",
                                    color: m.role === "user" ? "primary.contrastText" : "text.primary"
                                }}
                            >
                                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                    {m.content}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder={
                        ready
                            ? "Paste a JD or ask about role fit…"
                            : webgpuOK === false
                                ? "WebGPU not detected (try Chrome/Edge/Arc on desktop)."
                                : "Loading model…"
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!ready}
                    onKeyDown={(e) => e.key === "Enter" && ask()}
                />
                <Button variant="contained" onClick={ask} disabled={!ready}>
                    Send
                </Button>
            </Stack>

            {!ready && (
                <Typography variant="caption" sx={{ mt: 0.75, display: "block", opacity: 0.8 }}>
                    {bootMsg}
                </Typography>
            )}
        </Paper>,
        document.body
    );

}
