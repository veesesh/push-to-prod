"use client";

import { useState } from "react";
import TranscriptInput from "@/components/TranscriptInput";
import OutputCards from "@/components/OutputCards";
import { AnalysisResult } from "@/lib/claude";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setResult(data as AnalysisResult);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.35),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(253,224,71,0.28),_transparent_22%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_46%,_#f8fafc_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="heroShell reveal">
          <div className="max-w-3xl">
            <p className="eyebrow">MeetingMind</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl">
              Turn scattered meeting talk into a crisp update, owner list, and next-step plan.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Drop in call notes, Slack threads, or messy transcripts. MeetingMind pulls out the
              decisions, owners, deadlines, and blockers, then packages the output for a polished
              Genspark handoff.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span className="pillTag reveal reveal-delay-1">Built for ops, founders, and PMs</span>
            <span className="pillTag reveal reveal-delay-2">Structured by Claude</span>
            <span className="pillTag reveal reveal-delay-3">Finished in Genspark</span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="softCard reveal reveal-delay-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Step 1
              </p>
              <p className="mt-3 text-lg font-medium text-slate-950">Drop in the raw conversation</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use board-call notes, Slack backscroll, Zoom transcripts, or a rough internal recap.
              </p>
            </div>
            <div className="softCard reveal reveal-delay-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                Step 2
              </p>
              <p className="mt-3 text-lg font-medium text-slate-950">Extract the operational signal</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Get a clean summary, accountable owners, due dates, and the unresolved issues that still need attention.
              </p>
            </div>
            <div className="softCard reveal reveal-delay-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Step 3
              </p>
              <p className="mt-3 text-lg font-medium text-slate-950">Turn it into a leadership-ready artifact</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Open Genspark with the brief copied and shape it into a memo, tracker, or status update.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 reveal reveal-delay-2">
          <TranscriptInput
            value={transcript}
            onChange={setTranscript}
            onSubmit={handleSubmit}
            loading={loading}
            onUseSample={setTranscript}
            onClear={() => {
              setTranscript("");
              setResult(null);
              setError(null);
            }}
          />
        </div>

        {loading && (
          <div className="mt-6 panel reveal p-5 text-sm text-slate-600">
            Claude is separating signal from noise and drafting a structured action plan.
          </div>
        )}

        {error && (
          <div className="mt-6 reveal rounded-[28px] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 reveal reveal-delay-3">
            <OutputCards result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
