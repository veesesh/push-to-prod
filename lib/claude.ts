import Anthropic from "@anthropic-ai/sdk";
import { MAX_TRANSCRIPT_CHARACTERS } from "@/lib/limits";

const client = new Anthropic();

export interface ActionItem {
  owner: string;
  task: string;
  deadline: string;
}

export interface AnalysisResult {
  summary: string;
  tasks: ActionItem[];
  risks: string[];
  email_draft: string;
}

const SYSTEM_PROMPT = `You are an expert meeting analyst for fast-moving startup teams.
Return valid JSON only. No markdown. No code fences. No prose before or after the JSON.

Output schema:
{
  "summary": string,
  "tasks": [{ "owner": string, "task": string, "deadline": string }],
  "risks": string[],
  "email_draft": string
}

Rules:
- Keep the summary to 2-3 sentences.
- Extract only concrete actions.
- If an owner is missing, use "Unassigned".
- If a deadline is missing, use "No clear deadline".
- Risks should be crisp and decision-useful.
- The email draft should be short, professional, and ready to send.`;

function normalizeResult(payload: unknown): AnalysisResult {
  if (!payload || typeof payload !== "object") {
    throw new Error("Claude returned an invalid payload.");
  }

  const candidate = payload as Partial<AnalysisResult>;
  const tasks = Array.isArray(candidate.tasks) ? candidate.tasks : [];
  const risks = Array.isArray(candidate.risks) ? candidate.risks : [];

  return {
    summary:
      typeof candidate.summary === "string" && candidate.summary.trim()
        ? candidate.summary.trim()
        : "No summary generated.",
    tasks: tasks
      .map((task) => {
        if (!task || typeof task !== "object") {
          return null;
        }

        const item = task as Partial<ActionItem>;

        return {
          owner:
            typeof item.owner === "string" && item.owner.trim()
              ? item.owner.trim()
              : "Unassigned",
          task:
            typeof item.task === "string" && item.task.trim()
              ? item.task.trim()
              : "Follow up required",
          deadline:
            typeof item.deadline === "string" && item.deadline.trim()
              ? item.deadline.trim()
              : "No clear deadline",
        };
      })
      .filter((task): task is ActionItem => task !== null),
    risks: risks
      .filter((risk): risk is string => typeof risk === "string")
      .map((risk) => risk.trim())
      .filter(Boolean),
    email_draft:
      typeof candidate.email_draft === "string" && candidate.email_draft.trim()
        ? candidate.email_draft.trim()
        : "Team, sharing the latest action items and blockers from today's discussion.",
  };
}

function parseClaudeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Claude returned text that was not valid JSON.");
    }

    return JSON.parse(text.slice(start, end + 1));
  }
}

export async function analyzeTranscript(transcript: string): Promise<AnalysisResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Missing ANTHROPIC_API_KEY in .env.local");
  }

  if (transcript.trim().length > MAX_TRANSCRIPT_CHARACTERS) {
    throw new Error(`Transcript must be ${MAX_TRANSCRIPT_CHARACTERS.toLocaleString()} characters or fewer.`);
  }

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

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  return normalizeResult(parseClaudeJson(textBlock.text));
}
