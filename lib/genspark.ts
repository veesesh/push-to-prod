import { AnalysisResult } from "@/lib/claude";

export function buildGensparkPrompt(result: AnalysisResult): string {
  const taskLines = result.tasks.length
    ? result.tasks.map((task) => `- ${task.owner}: ${task.task} (${task.deadline})`).join("\n")
    : "- No concrete tasks identified.";

  const riskLines = result.risks.length
    ? result.risks.map((risk) => `- ${risk}`).join("\n")
    : "- No explicit blockers identified.";

  return `Create an executive project update from the meeting analysis below.

Goal:
- Produce a polished one-page status update for leadership.
- Keep the tone direct and professional.
- Highlight owners, deadlines, blockers, and decisions needed.

Sections to include:
1. Executive summary
2. Action items table
3. Risks and blockers
4. Decisions needed
5. Suggested next update cadence

Meeting summary:
${result.summary}

Action items:
${taskLines}

Risks and blockers:
${riskLines}

Follow-up email draft:
${result.email_draft}

Make the output presentation-ready and concise.`;
}

export const GENSPARK_HOME_URL = "https://www.genspark.ai/";
