"use client";

import { useProgress } from "@/lib/progress-context";

export default function LeaderboardPage() {
  const { completed } = useProgress();
  const completedCount = Object.keys(completed).length;
  const points = completedCount * 120;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-ink">Leaderboard</h1>
      <p className="text-ink-muted mb-10">Top learners in the SoroLearn community.</p>

      <div className="border border-border rounded-card overflow-hidden shadow-card">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-[11px] font-bold uppercase tracking-wide text-ink-muted px-4 py-3 bg-surface-alt border-b border-border">
                Rank
              </th>
              <th className="text-[11px] font-bold uppercase tracking-wide text-ink-muted px-4 py-3 bg-surface-alt border-b border-border">
                Handle
              </th>
              <th className="text-[11px] font-bold uppercase tracking-wide text-ink-muted px-4 py-3 bg-surface-alt border-b border-border">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "var(--color-accent-100)" }}>
              <td className="px-4 py-3 border-b border-border text-ink-muted">1</td>
              <td className="px-4 py-3 border-b border-border text-ink font-bold">you (this session)</td>
              <td className="px-4 py-3 border-b border-border text-ink-muted">{points} pts</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-muted mt-4">
        Community rankings aren&apos;t live yet — this shows your local session progress only.
      </p>
    </div>
  );
}
