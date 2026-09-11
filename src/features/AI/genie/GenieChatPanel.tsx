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
// type NonStreamResponse = {
//     choices?: Array<{ message?: { content?: string } }>;
// };

// Messages passed to the engine
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

// Removed custom ChatEngine type; we rely on MLCEngine from the library for correct overloads.

// const MODEL_ID = "Qwen2.5-3B-Instruct-q4f16_1-MLC"; // smaller & faster first-load

interface NavigatorDeviceMemory extends Navigator {
  deviceMemory?: number;
  gpu?: {
    requestAdapter: () => Promise<{
      features?: { has?: (feature: string) => boolean };
    } | null>;
  };
}

type GpuAdapterLike = { features?: { has?: (feature: string) => boolean } } | null;

// Probes WebGPU lazily (only when the panel is actually opened) and never throws,
// so a partial/stub `navigator.gpu` on some mobile browsers can't break module load.
async function detectWebGPU(): Promise<{ ok: boolean; adapter: GpuAdapterLike }> {
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) return { ok: false, adapter: null };
  try {
    const adapter = await (navigator as NavigatorDeviceMemory).gpu?.requestAdapter();
    return { ok: !!adapter, adapter: adapter ?? null };
  } catch {
    return { ok: false, adapter: null };
  }
}

function isSamsungInternet() {
  return typeof navigator !== 'undefined' && /SamsungBrowser/i.test(navigator.userAgent);
}

async function pickModelForDevice(adapter: GpuAdapterLike) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  // Check WebGPU + shader-f16 support
  const hasFP16 = !!adapter?.features?.has?.('shader-f16');

  // If mobile or low RAM, choose smaller family;
  // if FP16 is NOT supported, avoid f16 builds.
  if (isMobile || ((navigator as NavigatorDeviceMemory).deviceMemory ?? 4) < 4) {
    return hasFP16
      ? 'Qwen2.5-3B-Instruct-q4f16_1-MLC'
      : 'Qwen2.5-3B-Instruct-q4f32_1-MLC';
  }
  // Desktop: try the larger one, but still respect FP16 support
  return hasFP16
    ? 'Llama-3-8B-Instruct-q4f16_1-MLC'
    : 'Llama-3-8B-Instruct-q4f32_1-MLC';
}

type Engine = Awaited<ReturnType<typeof CreateMLCEngine>>;

export default function GenieChatPanel() {
    const { open, setOpen, ready, setReady } = useChatUI();
    const [bootMsg, setBootMsg] = useState("Loading AI in your browser… (first load can take 10–30s)");
    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState<Msg[]>([
        { role: "assistant", content: "Hi! Paste a job description or ask if Daniel fits a role." }
    ]);
    const engineRef = useRef<Engine | null>(null);
    const [webgpuOK, setWebgpuOK] = useState<boolean | null>(null);

   useEffect(() => {
  if (!open || ready) return;

  let cancelled = false;

  (async () => {
    const { ok: hasWebGPU, adapter } = await detectWebGPU();
    if (cancelled) return;
    setWebgpuOK(hasWebGPU);

    if (!hasWebGPU) {
      setReady(false);
      setBootMsg(
        isSamsungInternet()
          ? "Samsung Internet doesn't support WebGPU yet, so the in-browser AI can't run here. Open this site in Chrome for Android (or a desktop browser) to chat with the assistant."
          : "This browser doesn't support WebGPU, so the local (free) model can't run. Try the latest Chrome, Edge or Arc."
      );
      return;
    }

    try {
      const MODEL_ID = await pickModelForDevice(adapter);
      // Guard against a stalled download/compile hanging the "Loading…" state forever on slow mobile connections.
      const engine = await Promise.race([
        CreateMLCEngine(MODEL_ID),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timed out loading the model — check your connection and try again.')), 90_000)
        ),
      ]);
      if (cancelled) return;
      engineRef.current = engine;

      await engine.chat.completions.create({
        messages: [{ role: 'system', content: 'ping' }, { role: 'user', content: 'hi' }],
        stream: false,
        temperature: 0,
      });
      if (cancelled) return;

      setReady(true);
      setBootMsg('Ready.');
    } catch (e: unknown) {
      if (cancelled) return;
      const msg = e instanceof Error ? e.message : String(e);
      setReady(false);
      setBootMsg(`Could not start local model: ${msg}`);
    }
  })();

  return () => { cancelled = true; };
}, [open, ready, setReady]);


    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "g") setOpen(!open); // ⌘/Ctrl + G
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, setOpen]);

    const ask = async () => {
        if (!input.trim()) return;
  if (!ready || !engineRef.current) {
    // show a friendly “no WebGPU” message
    setMsgs((m) => [
      ...m,
      { role: "user", content: input.trim() },
      {
        role: "assistant",
        content: isSamsungInternet()
          ? "Samsung Internet doesn't support WebGPU yet, so the in-browser AI can't run here. Open this site in Chrome for Android (or a desktop browser) to chat with the assistant."
          : "This device/browser doesn’t support WebGPU, so the local (free) model can’t run. Try the latest Chrome or Edge, or use a desktop browser with WebGPU.",
      },
    ]);
    setInput("");
    return;
  }

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
