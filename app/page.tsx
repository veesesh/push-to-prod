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
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data as AnalysisResult);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">MeetingMind</h1>
          <p className="mt-2 text-gray-500 text-sm">
            Turn messy transcripts into clear action plans — powered by Claude + Genspark.
          </p>
        </div>

        <TranscriptInput
          value={transcript}
          onChange={setTranscript}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {loading && (
          <div className="mt-8 text-center text-sm text-gray-400">
            Claude is analyzing your transcript...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8">
            <OutputCards result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
