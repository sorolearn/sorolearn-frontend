import { notFound } from "next/navigation";
import LessonView from "@/components/LessonView";
import { getCourse, getLesson } from "@/lib/courses";

interface Props {
  params: { slug: string; lessonSlug: string };
}

export default function LessonPage({ params }: Props) {
  const course = getCourse(params.slug);
  const lesson = getLesson(params.slug, params.lessonSlug);
  if (!course || !lesson) notFound();

  return <LessonView course={course} lesson={lesson} />;
}
