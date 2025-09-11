'use client';
import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { loadQA, exportQA, importQA, type QA } from "@/data/lib/qaLocal";

export default function QaControls() {
  const [items, setItems] = useState<QA[]>([]);

  // load history when component mounts
  useEffect(() => setItems(loadQA()), []);

  function handleExport() {
    const blob = new Blob([exportQA()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qa-history-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      importQA(text);
      setItems(loadQA()); // reload after import
    };
    input.click();
  }

  return (
    <Stack spacing={1}>
      {/* Buttons */}
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={handleExport}>
          Export Q&A
        </Button>
        <Button size="small" variant="outlined" onClick={handleImport}>
          Import Q&A
        </Button>
      </Stack>

      {/* History list */}
      <Stack spacing={0.5} sx={{ maxHeight: 150, overflowY: "auto" }}>
        {items.map((it, i) => (
          <Typography key={i} variant="caption" sx={{ display: "block" }}>
            {new Date(it.ts).toLocaleString()} — <b>Q:</b> {it.q} | <b>A:</b> {it.a.slice(0, 30)}...
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
