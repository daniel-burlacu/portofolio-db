// app/api/qa/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Optional: simple allowlist if you only want to log from your domain
const ALLOW_ORIGINS = [process.env.PUBLIC_SITE_ORIGIN ?? ""];

export async function POST(req: Request) {
  try {
    // (1) Basic origin check (optional)
    const origin = req.headers.get("origin") || "";
    if (ALLOW_ORIGINS[0] && !ALLOW_ORIGINS.includes(origin)) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    // (2) Read body: { q, a, ts, meta? }
    const body = await req.json();

    // (3) Minimal validation & consent hint
    if (!body?.q || typeof body.q !== "string") {
      return NextResponse.json({ ok: false, error: "Missing q" }, { status: 400 });
    }
    // Optional anonymized meta (user agent only)
    const userAgent = req.headers.get("user-agent") || "";

    const payload = {
      ...body,
      meta: {
        ...body.meta,
        userAgent,
        savedAt: new Date().toISOString(),
      },
    };

    // (4) Unique key per entry (one blob per Q&A)
    const key = `qa/${new Date().toISOString()}-${crypto.randomUUID()}.json`;

    await put(key, JSON.stringify(payload, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
