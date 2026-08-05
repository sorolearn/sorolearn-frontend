import LessonGrid from "@/components/LessonGrid";
import { getCourse } from "@/lib/courses";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-accent font-semibold mb-2 uppercase text-sm tracking-wide">{course.difficulty}</p>
      <h1 className="text-4xl font-bold mb-4 text-ink">{course.title}</h1>
      <p className="text-ink-muted mb-10">{course.description}</p>

      <h2 className="text-2xl font-semibold mb-4 text-ink">Lessons</h2>
      <LessonGrid courseSlug={course.slug} lessons={course.lessons} />
    </div>
  );
}
