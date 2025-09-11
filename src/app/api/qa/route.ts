import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();            // expect { q, a, ts, meta? }
    if (!body?.q || typeof body.q !== "string") {
      return NextResponse.json({ ok: false, error: "Missing q" }, { status: 400 });
    }

    const payload = {
      ...body,
      _savedAt: new Date().toISOString(),
    };

    const key = `qa/${new Date().toISOString()}-${crypto.randomUUID()}.json`;

    // WRITE to Blob
    const res = await put(key, JSON.stringify(payload, null, 2), {
      access: "public",                       // keep 'public' until we confirm it works
      contentType: "application/json",
      // token: process.env.BLOB_READ_WRITE_TOKEN, // not needed if Blob is bound to project
    });

    // Log to Vercel function logs for visibility
    console.log("Saved Q&A to blob:", res.pathname);

    return NextResponse.json({ ok: true, key: res.pathname });
  } catch (err) {
    console.error("POST /api/qa failed:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
