'use client';
import { Fab, Tooltip } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useChatUI } from "./ChatProvider";

export default function GenieButton() {
  const { setOpen } = useChatUI();
  return (
    <Tooltip title="Chat with Daniel’s AI">
      <Fab
        color="primary"
        aria-label="Open AI chat"
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 1400, boxShadow: 6 }}
      >
        <ChatBubbleIcon />
      </Fab>
    </Tooltip>
  );
}
