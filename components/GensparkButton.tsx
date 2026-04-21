"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/claude";
import {
  buildGensparkPrompt,
  GENSPARK_AI_DOCS_URL,
  GENSPARK_SUPER_AGENT_URL,
} from "@/lib/genspark";

interface Props {
  result: AnalysisResult;
}

function downloadPrompt(prompt: string) {
  const blob = new Blob([prompt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meetingmind-brief.txt";
  a.click();
  URL.revokeObjectURL(url);
}

export default function GensparkButton({ result }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const prompt = buildGensparkPrompt(result);

  const copyToClipboard = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyError(null);
      return true;
    } catch {
      setCopyError(
        "Clipboard access was blocked. Use the download button to save the brief, then paste it into Genspark."
      );
      return false;
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard();
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleOpenDocs = async () => {
    await copyToClipboard();
    window.open(GENSPARK_AI_DOCS_URL, "_blank", "noopener,noreferrer");
  };

  const handleOpenSuperAgent = async () => {
    await copyToClipboard();
    window.open(GENSPARK_SUPER_AGENT_URL, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    downloadPrompt(prompt);
  };

  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Genspark Handoff</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Move from analysis to a presentable deliverable
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            MeetingMind prepares the brief and copies it to your clipboard. Open the Genspark
            surface that matches what you need, then paste.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-64">
          <button type="button" onClick={handleOpenDocs} className="primaryButton">
            Open in AI Docs
          </button>
          <button type="button" onClick={handleOpenSuperAgent} className="ghostButton w-full justify-center">
            Open in Super Agent
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="ghostButton flex-1 justify-center"
            >
              {copied ? "Copied" : "Copy brief"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="ghostButton flex-1 justify-center"
              title="Download brief as .txt"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {copyError && (
        <div className="mt-4 rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {copyError}
        </div>
      )}

      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        <div className="softCard">
          <span className="stepBadge">1</span>
          <p className="mt-3 text-sm font-medium text-slate-900">Choose your surface</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            <strong>AI Docs</strong> for a formatted memo or status report.{" "}
            <strong>Super Agent</strong> for a broader deliverable like a board update.
          </p>
        </div>
        <div className="softCard">
          <span className="stepBadge">2</span>
          <p className="mt-3 text-sm font-medium text-slate-900">Paste the prepared brief</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Already copied to your clipboard — includes summary, tasks, blockers, and formatting
            guidance.
          </p>
        </div>
        <div className="softCard">
          <span className="stepBadge">3</span>
          <p className="mt-3 text-sm font-medium text-slate-900">Refine the final output</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ask Genspark to tighten the layout, adjust the tone, or reformat for a specific
            audience.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-sm text-slate-100">
        <p className="text-xs uppercase tracking-[0.24em] text-sky-200">Prepared Brief</p>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-slate-200">
          {prompt}
        </pre>
      </div>
    </section>
  );
}
