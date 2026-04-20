import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface AnalysisResult {
  summary: string;
  tasks: { owner: string; task: string; deadline: string }[];
  risks: string[];
  email_draft: string;
}

const SYSTEM_PROMPT = `You are an expert meeting analyst. Always respond with valid JSON only — no markdown, no code fences, no explanation. Return exactly the structure requested.`;

export async function analyzeTranscript(transcript: string): Promise<AnalysisResult> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Analyze this internal meeting transcript or team conversation.

Return a JSON object with:
1. summary: 2-3 sentence overview
2. tasks: array of { owner, task, deadline }
3. risks: array of strings (blockers or missed items)
4. email_draft: short follow-up email text

Keep everything concise. If information is missing, flag it.

Transcript:
${transcript}`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  return JSON.parse(textBlock.text) as AnalysisResult;
}
