// /src/app/api/qa/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const ALLOW_ORIGINS = (process.env.PUBLIC_SITE_ORIGIN ?? "").split(",").map(s => s.trim()).filter(Boolean);
// e.g. set PUBLIC_SITE_ORIGIN to: https://danielburlacu.xyz,https://www.danielburlacu.xyz

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin") || "";
    if (ALLOW_ORIGINS.length && !ALLOW_ORIGINS.includes(origin)) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json(); // { q, a, ts, meta? }
    if (!body?.q || typeof body.q !== "string") {
      return NextResponse.json({ ok: false, error: "Missing q" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") || "";
    const payload = {
      ...body,
      meta: { ...body.meta, userAgent, savedAt: new Date().toISOString() },
    };

    const key = `qa/${new Date().toISOString()}-${crypto.randomUUID()}.json`;

    await put(key, JSON.stringify(payload, null, 2), {
      access: "public",                  // private is safer; switch to 'public' only if you need public URLs
      contentType: "application/json",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
