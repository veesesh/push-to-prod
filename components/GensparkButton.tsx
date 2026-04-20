"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/claude";
import { buildGensparkPrompt, GENSPARK_HOME_URL } from "@/lib/genspark";

interface Props {
  result: AnalysisResult;
}

export default function GensparkButton({ result }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const prompt = buildGensparkPrompt(result);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyError(null);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyError("Clipboard access failed. Copy the prompt from the panel below.");
    }
  };

  const handleOpen = () => {
    navigator.clipboard
      .writeText(prompt)
      .then(() => setCopyError(null))
      .catch(() => {
        setCopied(false);
        setCopyError("Genspark opened, but clipboard access was blocked. Copy the prompt below.");
      });
    window.open(GENSPARK_HOME_URL, "_blank", "noopener,noreferrer");
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
            The safest workflow is still prompt-first. MeetingMind prepares the brief, copies it,
            and sends you into Genspark so the final output can be refined as a polished document.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-64">
          <button type="button" onClick={handleOpen} className="primaryButton">
            Open Genspark workspace
          </button>
          <button type="button" onClick={handleCopy} className="ghostButton w-full justify-center">
            {copied ? "Copied brief" : "Copy handoff brief"}
          </button>
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
          <p className="mt-3 text-sm font-medium text-slate-900">Start in AI Docs or Super Agent</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use the workspace surface that matches the output you need: a memo, tracker, or leadership update.
          </p>
        </div>
        <div className="softCard">
          <span className="stepBadge">2</span>
          <p className="mt-3 text-sm font-medium text-slate-900">Paste the prepared handoff brief</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            It already includes summary, action items, blockers, and formatting guidance for an exec-ready artifact.
          </p>
        </div>
        <div className="softCard">
          <span className="stepBadge">3</span>
          <p className="mt-3 text-sm font-medium text-slate-900">Refine the final presentation</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ask Genspark for a board-ready memo, a cleaner tracker layout, or a more concise status readout.
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
