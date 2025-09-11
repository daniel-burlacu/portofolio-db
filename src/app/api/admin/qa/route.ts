import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// Use Node to avoid any Edge limitations while we debug
export const runtime = 'nodejs';

export async function GET() {
  try {
    // List all blobs saved under the "qa/" prefix
    const { blobs } = await list({ prefix: 'qa/' });
    return NextResponse.json(
      blobs.map(b => ({
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
        url: b.url, // signed URL
      }))
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Return the actual error so we can see what's wrong
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
