import { NextRequest, NextResponse } from "next/server";
import { analyzeTranscript } from "@/lib/claude";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript } = body as { transcript: string };

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: "Transcript is required." }, { status: 400 });
    }

    const result = await analyzeTranscript(transcript);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Claude API error:", err);
    const message = err instanceof Error ? err.message : "Unknown error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
