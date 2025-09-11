// /src/app/api/admin/qa/route.ts
import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const runtime = 'edge';

export async function GET() {
  const { blobs } = await list({ prefix: 'qa/' });
  return NextResponse.json(
    blobs.map(b => ({
      pathname: b.pathname,
      size: b.size,
      uploadedAt: b.uploadedAt,
      url: b.url,
    }))
  );
}
