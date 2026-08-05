import { notFound } from "next/navigation";
import LessonView from "@/components/LessonView";
import { getCourse, getLesson } from "@/lib/courses";

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const course = getCourse(slug);
  const lesson = getLesson(slug, lessonSlug);
  if (!course || !lesson) notFound();

  return <LessonView course={course} lesson={lesson} />;
}
