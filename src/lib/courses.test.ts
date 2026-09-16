import { describe, expect, it } from "vitest";
import {
  COURSES,
  challengeFor,
  checksFor,
  flattenLessons,
  getCourse,
  getLesson,
  hintsFor,
  lessonId,
  starterCodeFor,
  totalLessonCount,
} from "./courses";
import type { Lesson } from "@/types";

// A lesson with none of the optional per-lesson fields set — every lesson in
// COURSES has real content now, so the fallback behavior is tested against
// this synthetic lesson instead of depending on the curriculum staying
// incomplete (which is exactly what broke this file twice already).
const GENERIC_LESSON: Lesson = {
  slug: "generic",
  title: "Generic",
  description: "desc",
  intro: "intro",
  difficulty: "beginner",
  estimatedMinutes: 10,
  order: 1,
};

describe("getCourse", () => {
  it("finds a course by slug", () => {
    expect(getCourse("beginner")?.title).toBe("Rust for Soroban Developers");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getCourse("nonexistent")).toBeUndefined();
  });
});

describe("getLesson", () => {
  it("finds a lesson within a course", () => {
    const lesson = getLesson("beginner", "first-contract");
    expect(lesson?.title).toBe("Writing your first Soroban #[contract]");
  });

  it("returns undefined for an unknown lesson", () => {
    expect(getLesson("beginner", "nonexistent")).toBeUndefined();
  });

  it("returns undefined when the course itself doesn't exist", () => {
    expect(getLesson("nonexistent", "first-contract")).toBeUndefined();
  });
});

describe("lessonId", () => {
  it("joins course and lesson slugs", () => {
    expect(lessonId("beginner", "first-contract")).toBe("beginner/first-contract");
  });
});

describe("starterCodeFor", () => {
  it("uses the lesson's own starter code when set", () => {
    const lesson = getLesson("beginner", "first-contract")!;
    expect(starterCodeFor(lesson)).toContain("GreetContract");
  });

  it("falls back to the generic starter otherwise", () => {
    expect(starterCodeFor(GENERIC_LESSON)).toContain("pub struct Contract;");
  });
});

describe("hintsFor", () => {
  it("uses the lesson's own hints when set", () => {
    const lesson = getLesson("beginner", "rust-ownership-and-borrowing")!;
    expect(hintsFor(lesson).length).toBeGreaterThan(0);
    expect(hintsFor(lesson)[0]).toContain("len()");
  });

  it("falls back to the generic hints otherwise", () => {
    expect(hintsFor(GENERIC_LESSON)).toEqual([
      "Hint 1: Check the exact macro names — #[contract] and #[contractimpl].",
      "Hint 2: Every public function needs a matching signature in the impl block.",
    ]);
  });
});

describe("challengeFor", () => {
  it("uses the lesson's own challenge when set", () => {
    const lesson = getLesson("beginner", "error-handling-result-option")!;
    expect(challengeFor(lesson)).toContain("safe_divide");
  });

  it("falls back to a generic prompt otherwise", () => {
    expect(challengeFor(GENERIC_LESSON)).toBe(
      "Follow the lesson above, then edit the contract until Run Tests passes."
    );
  });
});

describe("checksFor", () => {
  it("uses the lesson's own checks when set", () => {
    const lesson = getLesson("beginner", "structs-enums-pattern-matching")!;
    expect(checksFor(lesson).requiredFunctions).toEqual([{ name: "opposite", params: ["dir"] }]);
  });

  it("falls back to defaultChecks (contract macros required) otherwise", () => {
    expect(checksFor(GENERIC_LESSON)).toEqual({
      requiredAttributes: ["#[contract]", "#[contractimpl]"],
      forbidPlaceholders: true,
    });
  });
});

describe("totalLessonCount", () => {
  it("matches the sum of every course's lessons", () => {
    const expected = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
    expect(totalLessonCount()).toBe(expected);
    expect(totalLessonCount()).toBe(16);
  });
});

describe("flattenLessons", () => {
  it("produces one flat entry per lesson, with correctly matched ids", () => {
    const flat = flattenLessons();
    expect(flat.length).toBe(totalLessonCount());
    for (const { course, lesson, id } of flat) {
      expect(id).toBe(lessonId(course.slug, lesson.slug));
      expect(course.lessons).toContain(lesson);
    }
  });
});
