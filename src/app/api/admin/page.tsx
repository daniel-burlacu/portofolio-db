'use client';
import { useEffect, useState } from 'react';

type BlobObject = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

export default function AdminPage() {
  const [logs, setLogs] = useState<BlobObject[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/qa')
      .then(async (r) => (r.ok ? r.json() : Promise.reject(await r.text())))
      .then((data: BlobObject[]) => setLogs(data))
      .catch((e) => setErr(String(e)));
  }, []);

  if (err) return <pre>Failed to load: {err}</pre>;
  if (!logs) return <p>Loading…</p>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Q&A Logs</h1>
      <ul>
        {logs.map((b) => (
          <li key={b.pathname}>
            <code>{b.pathname}</code> — {b.size} bytes — uploaded {b.uploadedAt}
          </li>
        ))}
      </ul>
    </div>
  );
}
