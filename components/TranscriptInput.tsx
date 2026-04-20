"use client";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function TranscriptInput({ value, onChange, onSubmit, loading }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full h-48 p-4 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-400"
        placeholder="Paste your meeting transcript, Slack thread, or WhatsApp messages here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={onSubmit}
        disabled={loading || value.trim().length === 0}
        className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Analyzing..." : "Generate Action Plan"}
      </button>
    </div>
  );
}
