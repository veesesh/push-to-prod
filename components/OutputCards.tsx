"use client";

import { AnalysisResult } from "@/lib/claude";
import GensparkButton from "./GensparkButton";

interface Props {
  result: AnalysisResult;
}

export default function OutputCards({ result }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
          Summary
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">{result.summary}</p>
      </div>

      {/* Tasks */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-4">
          Action Items
        </h2>
        {result.tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks identified.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Owner</th>
                <th className="pb-2 font-medium">Task</th>
                <th className="pb-2 font-medium">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {result.tasks.map((task, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 pr-4 font-medium text-gray-800">{task.owner}</td>
                  <td className="py-2 pr-4 text-gray-700">{task.task}</td>
                  <td className="py-2 text-gray-500">{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Risks */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-3">
          Risks & Blockers
        </h2>
        {result.risks.length === 0 ? (
          <p className="text-gray-400 text-sm">No risks identified.</p>
        ) : (
          <ul className="space-y-2">
            {result.risks.map((risk, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-red-400 mt-0.5">⚠</span>
                {risk}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Follow-up Email */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Follow-up Email Draft
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {result.email_draft}
        </p>
      </div>

      <GensparkButton result={result} />
    </div>
  );
}
