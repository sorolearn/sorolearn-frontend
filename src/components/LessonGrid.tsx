"use client";

import Link from "next/link";
import type { Lesson } from "@/types";
import { lessonId } from "@/lib/courses";
import { useProgress } from "@/lib/progress-context";

export default function LessonGrid({ courseSlug, lessons }: { courseSlug: string; lessons: Lesson[] }) {
  const { completed } = useProgress();

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
      {lessons.map((lesson) => {
        const done = completed[lessonId(courseSlug, lesson.slug)];
        return (
          <Link
            key={lesson.slug}
            href={`/course/${courseSlug}/${lesson.slug}`}
            className="flex flex-col justify-between gap-4 p-5 bg-surface border border-border rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-ink-muted">{lesson.estimatedMinutes} min</div>
              {done && <div className="text-[11px] font-bold text-accent">✓ Done</div>}
            </div>
            <div className="flex items-end justify-between gap-2.5">
              <div className="text-[15px] font-semibold leading-tight text-ink">{lesson.title}</div>
              <div className="text-base text-accent flex-shrink-0">→</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
