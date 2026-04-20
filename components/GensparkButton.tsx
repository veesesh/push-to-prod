"use client";

import { AnalysisResult } from "@/lib/claude";

interface Props {
  result: AnalysisResult;
}

function buildGensparkPrompt(result: AnalysisResult): string {
  const taskLines = result.tasks
    .map((t) => `- ${t.owner}: ${t.task} (by ${t.deadline})`)
    .join("\n");
  const riskLines = result.risks.map((r) => `- ${r}`).join("\n");

  return `Create an executive team update document from this meeting summary:

${result.summary}

Tasks:
${taskLines || "No tasks identified."}

Risks:
${riskLines || "No risks identified."}

Format as a clean project tracker with sections for this week's progress, action items, and blockers.`;
}

export default function GensparkButton({ result }: Props) {
  const handleClick = () => {
    const prompt = buildGensparkPrompt(result);
    const url = `https://www.genspark.ai/agents?type=moa_search&query=${encodeURIComponent(prompt)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 px-6 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
    >
      Generate Report with Genspark →
    </button>
  );
}
