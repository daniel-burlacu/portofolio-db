'use client';
import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";

type ChatCtx = { open: boolean; setOpen: (v: boolean) => void; ready: boolean; setReady: (v: boolean) => void; };
const Ctx = createContext<ChatCtx | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(() => (typeof window !== 'undefined' && localStorage.getItem("genieOpen") === "1") || false);
  const [ready, setReady] = useState(false);
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem("genieOpen", open ? "1" : "0"); }, [open]);
  const value = useMemo(() => ({ open, setOpen, ready, setReady }), [open, ready]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useChatUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChatUI must be used within <ChatProvider>");
  return ctx;
}
