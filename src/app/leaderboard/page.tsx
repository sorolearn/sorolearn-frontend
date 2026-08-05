"use client";

import { useProgress } from "@/lib/progress-context";

// Placeholder community data — will be replaced with on-chain data
const LEADERBOARD_BASE = [
  { handle: "wasm_wendy", points: 4820 },
  { handle: "stellar_sam", points: 4310 },
  { handle: "rustacean_ren", points: 3990 },
  { handle: "lumen_lee", points: 3405 },
  { handle: "anchor_amy", points: 2980 },
  { handle: "soroban_theo", points: 2510 },
  { handle: "contract_cass", points: 1875 },
  { handle: "testnet_tia", points: 1204 },
];

export default function LeaderboardPage() {
  const { completed } = useProgress();
  const completedCount = Object.keys(completed).length;

  const rows = [...LEADERBOARD_BASE, { handle: "you", points: completedCount * 120, isYou: true }]
    .sort((a, b) => b.points - a.points)
    .slice(0, 9);

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
            {rows.map((row, i) => (
              <tr key={row.handle} style={{ background: "isYou" in row && row.isYou ? "var(--color-accent-100)" : "transparent" }}>
                <td className="px-4 py-3 border-b border-border text-ink-muted">{i + 1}</td>
                <td
                  className="px-4 py-3 border-b border-border text-ink"
                  style={{ fontWeight: "isYou" in row && row.isYou ? 700 : 400 }}
                >
                  {"isYou" in row && row.isYou ? "you (this session)" : row.handle}
                </td>
                <td className="px-4 py-3 border-b border-border text-ink-muted">{row.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
