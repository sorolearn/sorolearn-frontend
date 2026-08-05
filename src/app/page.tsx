import Link from "next/link";
import LessonGrid from "@/components/LessonGrid";
import { COURSES, totalLessonCount } from "@/lib/courses";

const levelLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-br from-accent to-accent-hover rounded-b-[28px]">
        <div className="max-w-[1160px] mx-auto px-8 pt-16 pb-22 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div className="flex flex-col gap-4 gap-y-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
              Open source · Built for Stellar
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Learn Soroban smart contracts, hands-on.
            </h1>
            <p className="text-white/90 text-lg max-w-md leading-relaxed">
              Interactive, in-browser lessons for building Rust + WebAssembly contracts on Stellar — no local
              setup required.
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href="/courses"
                className="bg-white text-accent font-bold text-sm px-6 py-3 rounded-btn hover:opacity-90 transition"
              >
                Start learning
              </Link>
              <a
                href="https://github.com/sorolearn/sorolearn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-btn border border-white/30 hover:bg-white/20 transition"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="h-[280px] rounded-card overflow-hidden shadow-card-hover bg-[#1e2028] flex flex-col">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="text-[11px] text-gray-400 ml-3 font-mono">contract.rs</div>
            </div>
            <div className="flex-1 px-5 py-5 font-mono text-[12.5px] leading-[1.8] flex flex-col gap-0.5">
              <div className="text-[#ff7ab8]">#![no_std]</div>
              <div>
                <span className="text-[#7dd3fc]">use</span>{" "}
                <span className="text-[#e7ecf5]">soroban_sdk::{"{"}contract, contractimpl, Env{"}"};</span>
              </div>
              <div>&nbsp;</div>
              <div className="text-[#c4b5fd]">#[contract]</div>
              <div>
                <span className="text-[#7dd3fc]">pub struct</span> <span className="text-[#fbbf24]">MyContract</span>;
              </div>
              <div>&nbsp;</div>
              <div className="text-[#c4b5fd]">#[contractimpl]</div>
              <div>
                <span className="text-[#7dd3fc]">impl</span> <span className="text-[#fbbf24]">MyContract</span> {"{"}
              </div>
              <div className="pl-4 text-[#6ee7b7]">{"// your code here"}</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip, overlapping hero */}
      <div className="max-w-[1160px] mx-auto -mt-12 w-full px-8">
        <div className="bg-surface rounded-card shadow-card-hover px-9 py-7 grid grid-cols-3">
          <div>
            <div className="text-3xl font-extrabold text-ink">{COURSES.length}</div>
            <div className="text-[13px] text-ink-muted">Learning paths</div>
          </div>
          <div className="border-l border-border pl-6">
            <div className="text-3xl font-extrabold text-ink">{totalLessonCount()}</div>
            <div className="text-[13px] text-ink-muted">Lessons</div>
          </div>
          <div className="border-l border-border pl-6">
            <div className="text-3xl font-extrabold text-ink">MIT</div>
            <div className="text-[13px] text-ink-muted">Licensed</div>
          </div>
        </div>
      </div>

      {/* Why section */}
      <div className="max-w-[1160px] mx-auto w-full px-8 pt-18 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
          <div className="text-[13px] font-bold uppercase tracking-wide text-accent">Why SoroLearn</div>
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-base leading-relaxed text-ink">
              Soroban is unique in the blockchain world — it uses Rust and WebAssembly instead of Solidity and
              the EVM. Every existing Solidity tutorial is irrelevant to someone learning Soroban, and developers
              starting on Stellar have almost nowhere to go beyond the official docs.
            </p>
            <p className="text-base leading-relaxed text-ink-muted">
              SoroLearn is the community-owned answer: a structured, interactive, beginner-to-expert curriculum
              built by Soroban developers, for Soroban developers.
            </p>
          </div>
        </div>
      </div>

      {/* Learning paths */}
      <div className="max-w-[1160px] mx-auto w-full px-8 py-16 flex flex-col gap-14">
        {COURSES.map((course) => {
          const totalMinutes = course.lessons.reduce((s, l) => s + l.estimatedMinutes, 0);
          return (
            <div key={course.slug} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="m-0 text-xl font-bold text-ink">{course.title}</h3>
                <div className="text-xs font-semibold px-3 py-1 bg-accent-100 text-accent-700 rounded-pill">
                  {levelLabel[course.difficulty]}
                </div>
                <div className="text-[13px] text-ink-muted ml-auto">
                  {course.lessons.length} lessons · {totalMinutes} min
                </div>
              </div>
              <p className="text-sm text-ink-muted max-w-xl">{course.description}</p>
              <LessonGrid courseSlug={course.slug} lessons={course.lessons} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
