"use client";

import { MAX_TRANSCRIPT_CHARACTERS } from "@/lib/limits";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
  onUseSample: (val: string) => void;
  onClear: () => void;
}

const SAMPLE_TRANSCRIPT = `Rahul will finalize pricing by Friday.
Aditi to speak with the vendor tomorrow morning.
Legal approval is still blocked and could delay launch.
We need an investor update ready by Monday, but nobody owns it yet.
Engineering said onboarding copy needs one more review before release.`;

export default function TranscriptInput({
  value,
  onChange,
  onSubmit,
  loading,
  onUseSample,
  onClear,
}: Props) {
  const trimmedLength = value.trim().length;
  const isTooLong = trimmedLength > MAX_TRANSCRIPT_CHARACTERS;

  return (
    <section className="panel p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Raw Input</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Paste the notes exactly as they happened
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            No cleanup required. The app can work from fragmented notes, chat logs, or speaker-by-speaker transcripts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onUseSample(SAMPLE_TRANSCRIPT)} className="ghostButton">
            Use sample
          </button>
          <button type="button" onClick={onClear} className="ghostButton">
            Clear
          </button>
        </div>
      </div>

      <div className="mt-5">
        <textarea
          className="min-h-64 w-full resize-y rounded-[28px] border border-white/70 bg-white/85 px-5 py-4 text-sm leading-6 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Paste the meeting transcript, internal thread, or note dump here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={MAX_TRANSCRIPT_CHARACTERS + 1000}
          disabled={loading}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-xs uppercase tracking-[0.24em] ${isTooLong ? "text-rose-500" : "text-slate-400"}`}>
          {trimmedLength === 0
            ? "No transcript loaded"
            : `${trimmedLength.toLocaleString()} / ${MAX_TRANSCRIPT_CHARACTERS.toLocaleString()} characters`}
        </p>

        <button
          onClick={onSubmit}
          disabled={loading || trimmedLength === 0 || isTooLong}
          className="primaryButton sm:min-w-60"
        >
          {loading ? "Building action plan..." : "Extract action plan"}
        </button>
      </div>
    </section>
  );
}
