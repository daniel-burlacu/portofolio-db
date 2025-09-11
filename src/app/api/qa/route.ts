import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

// Allow both apex and www (or disable check while testing)
const ALLOW_ORIGINS = (process.env.PUBLIC_SITE_ORIGIN ?? "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);
// Example env: PUBLIC_SITE_ORIGIN="https://danielburlacu.xyz,https://www.danielburlacu.xyz"

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin") || "";
    if (ALLOW_ORIGINS.length && !ALLOW_ORIGINS.includes(origin)) {
      return NextResponse.json({ ok: false, error: "Forbidden origin", origin }, { status: 403 });
    }

    const body = await req.json(); // expect { q, a, ts, meta? }
    if (!body?.q || typeof body.q !== "string") {
      return NextResponse.json({ ok: false, error: "Missing q" }, { status: 400 });
    }

    const text = `Q: ${body.q}\nA: ${body.a}\nTime: ${new Date().toISOString()}${body.meta ? `\nMeta: ${JSON.stringify(body.meta)}` : ''}`;
    const key = `qa/${new Date().toISOString()}-${crypto.randomUUID()}.txt`;

    await put(key, text, {
      access: "private" as "public",
      contentType: "text/plain",
    });

    return NextResponse.json({ ok: true, key });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
