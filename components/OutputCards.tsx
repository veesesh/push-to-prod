"use client";

import { AnalysisResult } from "@/lib/claude";
import GensparkButton from "./GensparkButton";

interface Props {
  result: AnalysisResult;
}

export default function OutputCards({ result }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="panel p-6 sm:p-7">
          <p className="eyebrow">Executive Readout</p>
          <p className="mt-3 text-base leading-8 text-slate-700">{result.summary}</p>
        </div>

        <div className="panel p-6 sm:p-7">
          <p className="eyebrow">At A Glance</p>
          <div className="mt-4 grid gap-3">
            <div className="softCard">
              <p className="text-3xl font-semibold text-slate-950">{result.tasks.length}</p>
              <p className="mt-1 text-sm text-slate-600">Concrete actions captured</p>
            </div>
            <div className="softCard">
              <p className="text-3xl font-semibold text-slate-950">{result.risks.length}</p>
              <p className="mt-1 text-sm text-slate-600">Blockers or risks surfaced</p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel overflow-hidden p-0">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Action Items
          </h2>
        </div>
        {result.tasks.length === 0 ? (
          <p className="px-6 py-6 text-sm text-slate-500 sm:px-7">No tasks identified.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                  <th className="px-6 py-3 font-medium sm:px-7">Owner</th>
                  <th className="px-6 py-3 font-medium">Task</th>
                  <th className="px-6 py-3 font-medium sm:px-7">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {result.tasks.map((task, i) => (
                  <tr
                    key={`${task.owner}-${task.task}-${i}`}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 sm:px-7">{task.owner}</td>
                    <td className="px-6 py-4 text-slate-700">{task.task}</td>
                    <td className="px-6 py-4 text-slate-500 sm:px-7">{task.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-6 sm:p-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">
            Risks & Blockers
          </h2>
          {result.risks.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No material blockers were detected.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {result.risks.map((risk, i) => (
                <li key={`${risk}-${i}`} className="softCard flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
                    !
                  </span>
                  <span className="text-sm leading-6 text-slate-700">{risk}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel p-6 sm:p-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Follow-up Note
          </h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {result.email_draft}
          </p>
        </div>
      </div>

      <GensparkButton result={result} />
    </div>
  );
}
