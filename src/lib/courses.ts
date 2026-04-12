import type { Course, Lesson } from "@/types";

// Static course registry — lessons are MDX files in src/content/
export const COURSES: Course[] = [
  {
    slug: "beginner",
    title: "Rust for Soroban Developers",
    description: "Learn the Rust fundamentals you need to write Soroban smart contracts, even if you've never touched Rust before.",
    difficulty: "beginner",
    lessons: [
      {
        slug: "first-contract",
        title: "Your First Soroban Contract",
        description: "Write, deploy, and invoke your first Soroban smart contract.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        order: 1,
      },
      {
        slug: "storage-basics",
        title: "Storage in Soroban",
        description: "Learn the three storage types: persistent, temporary, and instance.",
        difficulty: "beginner",
        estimatedMinutes: 25,
        order: 2,
      },
    ],
  },
  {
    slug: "intermediate",
    title: "Soroban Fundamentals",
    description: "Go deeper into Soroban: auth, tokens, cross-contract calls, and testing.",
    difficulty: "intermediate",
    lessons: [
      {
        slug: "authorization",
        title: "Authorization & require_auth()",
        description: "Secure your contracts with Soroban's built-in authorization model.",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        order: 1,
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string): Lesson | undefined {
  return getCourse(courseSlug)?.lessons.find((l) => l.slug === lessonSlug);
}
