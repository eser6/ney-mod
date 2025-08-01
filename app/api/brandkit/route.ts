import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const output = `Here's your brand kit based on "${input}":\n\nLogo: ...\nColors: ...\nFonts: ...`;
  return NextResponse.json({ output });
}
