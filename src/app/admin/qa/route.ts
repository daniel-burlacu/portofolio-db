// app/api/admin/qa/route.ts
import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const runtime = 'edge'; // optional, Blob works in edge or node

export async function GET() {
  const { blobs } = await list({ prefix: 'qa/' });
  // Minimal payload so it's easy to render
  const out = blobs.map(b => ({
    pathname: b.pathname,
    size: b.size,
    uploadedAt: b.uploadedAt,
    url: b.url, // signed URL (short-lived)
  }));
  return NextResponse.json(out);
}
