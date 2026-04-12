import Link from "next/link";
import { getCourse } from "@/lib/courses";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default function CoursePage({ params }: Props) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-stellar-purple font-medium mb-2 uppercase text-sm tracking-wide">
        {course.difficulty}
      </p>
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-400 mb-10">{course.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
      <ol className="space-y-3">
        {course.lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              href={`/course/${course.slug}/${lesson.slug}`}
              className="block p-4 rounded-lg border border-gray-800 hover:border-stellar-purple transition"
            >
              <span className="font-semibold">{lesson.title}</span>
              <span className="text-gray-500 text-sm ml-3">{lesson.estimatedMinutes} min</span>
              <p className="text-gray-400 text-sm mt-1">{lesson.description}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
