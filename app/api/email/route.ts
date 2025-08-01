// app/api/email/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();

  // Simulate AI logic or call OpenAI here
  const response = `Here's your cold email based on: "${input}"`;

  return NextResponse.json({ output: response });
}
