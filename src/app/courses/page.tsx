import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-ink">All Courses</h1>
      <p className="text-ink-muted mb-10">
        Choose your starting point. Each course is self-contained and progressively builds on the last.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSES.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
