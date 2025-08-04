// app/api/email/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    output: "Cold email generation is not yet live. Stay tuned!",
  });
}
