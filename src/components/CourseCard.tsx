import Link from "next/link";
import type { Course } from "@/types";

const difficultyColor: Record<string, string> = {
  beginner: "text-green-400",
  intermediate: "text-yellow-400",
  advanced: "text-red-400",
};

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="block p-6 rounded-xl border border-gray-800 hover:border-stellar-purple transition"
    >
      <span className={`text-xs font-semibold uppercase tracking-wide ${difficultyColor[course.difficulty]}`}>
        {course.difficulty}
      </span>
      <h3 className="text-xl font-bold mt-2 mb-1">{course.title}</h3>
      <p className="text-gray-400 text-sm">{course.description}</p>
      <p className="text-gray-600 text-xs mt-3">{course.lessons.length} lessons</p>
    </Link>
  );
}
