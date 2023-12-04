import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(req: NextRequest) {
  console.log("hello from POST");
}