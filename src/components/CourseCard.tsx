import Link from "next/link";
import type { Course } from "@/types";

const levelLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="block p-6 rounded-card border border-border bg-surface shadow-card hover:shadow-card-hover hover:border-accent transition-all"
    >
      <span className="text-xs font-semibold px-3 py-1 bg-accent-100 text-accent-700 rounded-pill">
        {levelLabel[course.difficulty]}
      </span>
      <h3 className="text-xl font-bold mt-3 mb-1 text-ink">{course.title}</h3>
      <p className="text-ink-muted text-sm">{course.description}</p>
      <p className="text-ink-muted text-xs mt-3 opacity-70">{course.lessons.length} lessons</p>
    </Link>
  );
}
