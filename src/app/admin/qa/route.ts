// app/admin/qa/route.ts (or a page that calls this route)
import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list({ prefix: "qa/" });
  // Return list of keys to download later
  return NextResponse.json({ blobs: blobs.map(b => ({ pathname: b.pathname, size: b.size })) });
}
