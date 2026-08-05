import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="max-w-[1160px] mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8">
        <div className="flex flex-col gap-2.5">
          <div className="text-lg font-extrabold text-ink">SoroLearn</div>
          <p className="text-[13px] text-ink-muted max-w-[260px] leading-relaxed">
            Interactive education for building Soroban smart contracts on Stellar.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">Learning</div>
          <Link href="/course/beginner" className="text-[13px] text-ink hover:text-accent transition">
            Beginner path
          </Link>
          <Link href="/course/intermediate" className="text-[13px] text-ink hover:text-accent transition">
            Intermediate path
          </Link>
          <Link href="/course/advanced" className="text-[13px] text-ink hover:text-accent transition">
            Advanced path
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">Community</div>
          <Link href="/leaderboard" className="text-[13px] text-ink hover:text-accent transition">
            Leaderboard
          </Link>
          <a
            href="https://github.com/sorolearn/sorolearn/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink hover:text-accent transition"
          >
            Contributing content
          </a>
          <Link href="/certificate" className="text-[13px] text-ink hover:text-accent transition">
            On-chain certificates
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">Project</div>
          <a
            href="https://github.com/sorolearn/sorolearn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink hover:text-accent transition"
          >
            GitHub
          </a>
          <a
            href="https://github.com/sorolearn/sorolearn/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink hover:text-accent transition"
          >
            MIT License
          </a>
        </div>
      </div>
    </footer>
  );
}
