import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "qa/" });
    return NextResponse.json(
      blobs.map(b => ({
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
        url: b.url, // signed URL
      }))
    );
  } catch (err) {
    console.error("GET /api/admin/qa failed:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
