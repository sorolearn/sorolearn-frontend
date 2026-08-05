"use client";

import Link from "next/link";
import Editor from "@/components/Editor";
import { COURSES, challengeFor, hintsFor, lessonId, starterCodeFor } from "@/lib/courses";
import { useProgress } from "@/lib/progress-context";
import type { Course, Lesson } from "@/types";

const levelLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function LessonView({ course, lesson }: { course: Course; lesson: Lesson }) {
  const { completed, getCode, setCode, testStatus, runTests, hintsShown, unlockHint } = useProgress();
  const id = lessonId(course.slug, lesson.slug);
  const code = getCode(id, starterCodeFor(lesson));
  const status = testStatus[id];
  const hints = hintsFor(lesson);
  const shown = hintsShown[id] ?? 0;

  return (
    <div className="flex items-start">
      {/* Sidebar */}
      <div className="w-[270px] flex-shrink-0 bg-surface-alt border-r border-border py-6 h-[calc(100vh-65px)] overflow-y-auto sticky top-[65px] hidden lg:block">
        {COURSES.map((c) => (
          <div key={c.slug} className="px-5 pb-5">
            <div className="text-[11px] font-bold uppercase tracking-wide text-ink-muted mb-2.5">
              {levelLabel[c.difficulty]}
            </div>
            {c.lessons.map((l) => {
              const lId = lessonId(c.slug, l.slug);
              const isCurrent = lId === id;
              const done = completed[lId];
              return (
                <Link
                  key={l.slug}
                  href={`/course/${c.slug}/${l.slug}`}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px]"
                  style={{
                    color: isCurrent ? "var(--color-accent)" : "var(--color-text)",
                    fontWeight: isCurrent ? 700 : 400,
                    background: isCurrent ? "var(--color-accent-100)" : "transparent",
                  }}
                >
                  <span className="w-3.5 flex-shrink-0 text-accent">{done ? "✓" : isCurrent ? "›" : ""}</span>
                  <span>{l.title}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 md:px-12 py-10 flex flex-col gap-6 max-w-[820px]">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="text-xs font-semibold px-3 py-1 bg-accent-100 text-accent-700 rounded-pill">
              {levelLabel[lesson.difficulty]}
            </div>
            <div className="text-xs text-ink-muted">{lesson.estimatedMinutes} min</div>
          </div>
          <h2 className="m-0 text-[28px] font-bold text-ink">{lesson.title}</h2>
          <p className="text-[15px] text-ink-muted leading-relaxed max-w-xl">{lesson.intro}</p>
        </div>

        <div className="bg-surface-alt border border-border rounded-card p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink-muted mb-2">Challenge</div>
          <div className="text-sm leading-relaxed text-ink">{challengeFor(lesson)}</div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">Editor</div>
          <Editor defaultValue={code} onChange={(value) => setCode(id, value)} />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => runTests(id, code)}
              className="cursor-pointer px-5 py-2.5 bg-accent text-white font-bold text-sm rounded-btn hover:bg-accent-hover transition"
            >
              {status === "running" ? "Running…" : "Run Tests"}
            </button>
            {status && status !== "running" && (
              <div className="text-[13px] font-semibold text-accent">
                {status === "pass" ? "✓ 2/2 tests passed" : "✗ Contract does not compile — check the impl block."}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => unlockHint(id, hints.length)}
            className="cursor-pointer text-[13px] font-semibold text-accent w-fit"
          >
            {shown >= hints.length ? "No more hints" : `Show hint (${shown + 1} of ${hints.length})`}
          </button>
          {hints.slice(0, shown).map((hint, i) => (
            <div key={i} className="text-[13px] text-ink-muted bg-accent-100 rounded-lg px-3.5 py-2.5">
              {hint}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
