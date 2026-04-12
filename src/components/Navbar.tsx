import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 px-4 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          SoroLearn
        </Link>
        <div className="flex gap-6 text-gray-400 text-sm">
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="/leaderboard" className="hover:text-white transition">Leaderboard</Link>
          <a
            href="https://github.com/sorolearn/sorolearn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
