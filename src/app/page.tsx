import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/lib/courses";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Learn Soroban.</h1>
        <p className="text-xl text-gray-400 mb-8">
          The interactive platform for mastering Soroban smart contract development on Stellar.
          Write real contracts in the browser — no setup required.
        </p>
        <Link
          href="/courses"
          className="bg-stellar-purple text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Start Learning
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
