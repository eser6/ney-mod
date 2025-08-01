import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const output = `Landing page copy generated from: "${input}"`;
  return NextResponse.json({ output });
}
