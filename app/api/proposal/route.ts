import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const output = `Here's a business proposal generated from: "${input}"`;
  return NextResponse.json({ output });
}
