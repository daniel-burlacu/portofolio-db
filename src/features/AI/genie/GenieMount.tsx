'use client';
import { ChatProvider } from "./ChatProvider";
import GenieButton from "./GenieButton";
import dynamic from "next/dynamic";

// Panel must be client-only (uses browser/WebGPU APIs)
const GenieChatPanel = dynamic(() => import("./GenieChatPanel"), { ssr: false });

export default function GenieMount() {
  return (
    <ChatProvider>
      <GenieButton />
      <GenieChatPanel />
    </ChatProvider>
  );
}
