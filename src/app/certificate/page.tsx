"use client";

import ProgressBar from "@/components/ProgressBar";
import { COURSES, lessonId } from "@/lib/courses";
import { useProgress } from "@/lib/progress-context";

const BEGINNER = COURSES[0];
const REQUIRED_BEGINNER = BEGINNER.lessons.length;

export default function CertificatePage() {
  const { completed, certMinted, mintCertificate } = useProgress();

  const beginnerDone = BEGINNER.lessons.filter((l) => completed[lessonId(BEGINNER.slug, l.slug)]).length;
  const unlocked = beginnerDone >= REQUIRED_BEGINNER;
  const progressPct = Math.round((beginnerDone / REQUIRED_BEGINNER) * 100);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 flex flex-col gap-6 items-center">
      <h2 className="m-0 self-start text-2xl font-bold text-ink">Certificate</h2>

      {unlocked ? (
        <>
          <div
            className="w-full aspect-[1.6] rounded-card flex flex-col items-center justify-center gap-3.5 p-8 box-border shadow-card-hover"
            style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))" }}
          >
            <div className="text-xs tracking-widest uppercase text-white/80">
              Stellar Testnet · On-chain certificate
            </div>
            <div className="text-2xl font-extrabold text-center text-white">{BEGINNER.title}</div>
            <div className="text-[13px] text-white/85">Awarded to you</div>
          </div>
          {certMinted ? (
            <div className="text-[13px] text-ink-muted">
              Certificate unlocked (minting to a Stellar wallet isn&apos;t connected yet)
            </div>
          ) : (
            <button
              type="button"
              onClick={mintCertificate}
              className="cursor-pointer px-6 py-3 bg-accent text-white text-sm font-bold rounded-btn hover:bg-accent-hover transition"
            >
              Mint certificate NFT
            </button>
          )}
        </>
      ) : (
        <div className="w-full border border-border rounded-card p-10 flex flex-col gap-3.5 items-center text-center bg-surface-alt">
          <div className="text-[15px] text-ink-muted">Complete the Beginner path to unlock your certificate.</div>
          <div className="w-full max-w-xs">
            <ProgressBar percent={progressPct} />
          </div>
          <div className="text-xs text-ink-muted">
            {beginnerDone}/{REQUIRED_BEGINNER} lessons
          </div>
        </div>
      )}
    </div>
  );
}
