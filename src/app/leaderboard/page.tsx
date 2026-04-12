import type { LeaderboardEntry } from "@/types";

// Placeholder data — will be replaced with on-chain data
const entries: LeaderboardEntry[] = [
  { rank: 1, username: "stellar_dev", points: 1240, coursesCompleted: 3 },
  { rank: 2, username: "soroban_builder", points: 980, coursesCompleted: 2 },
  { rank: 3, username: "rust_wizard", points: 740, coursesCompleted: 2 },
];

export default function LeaderboardPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
      <p className="text-gray-400 mb-10">Top learners in the SoroLearn community.</p>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 text-gray-500 text-sm uppercase">
            <th className="py-3 pr-4">Rank</th>
            <th className="py-3 pr-4">Username</th>
            <th className="py-3 pr-4">Points</th>
            <th className="py-3">Courses</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.rank} className="border-b border-gray-800 hover:bg-gray-900 transition">
              <td className="py-4 pr-4 font-bold text-stellar-purple">#{e.rank}</td>
              <td className="py-4 pr-4">{e.username}</td>
              <td className="py-4 pr-4">{e.points.toLocaleString()}</td>
              <td className="py-4">{e.coursesCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
