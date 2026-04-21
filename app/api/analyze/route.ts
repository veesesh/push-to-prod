import { NextRequest, NextResponse } from "next/server";
import { analyzeTranscript } from "@/lib/claude";
import { MAX_TRANSCRIPT_CHARACTERS } from "@/lib/limits";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript } = body as { transcript: string };

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: "Transcript is required." }, { status: 400 });
    }

    if (transcript.trim().length > MAX_TRANSCRIPT_CHARACTERS) {
      return NextResponse.json(
        { error: `Transcript must be ${MAX_TRANSCRIPT_CHARACTERS.toLocaleString()} characters or fewer.` },
        { status: 413 }
      );
    }

    const result = await analyzeTranscript(transcript);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Claude API error:", err);
    const message = err instanceof Error ? err.message : "Unknown error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
