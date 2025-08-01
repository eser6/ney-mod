import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const output = `This would be a great Instagram caption for: "${input}"`;
  return NextResponse.json({ output });
}
