import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import LessonGrid from "./LessonGrid";
import { ProgressProvider } from "@/lib/progress-context";
import type { Lesson } from "@/types";

const LESSONS: Lesson[] = [
  {
    slug: "first",
    title: "First lesson",
    description: "desc",
    intro: "intro",
    difficulty: "beginner",
    estimatedMinutes: 15,
    order: 1,
  },
  {
    slug: "second",
    title: "Second lesson",
    description: "desc",
    intro: "intro",
    difficulty: "beginner",
    estimatedMinutes: 30,
    order: 2,
  },
];

function renderGrid() {
  return render(
    <ProgressProvider>
      <LessonGrid courseSlug="beginner" lessons={LESSONS} />
    </ProgressProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe("LessonGrid", () => {
  it("renders one card per lesson with the right link and minutes", () => {
    renderGrid();
    const firstLink = screen.getByText("First lesson").closest("a");
    expect(firstLink).toHaveAttribute("href", "/course/beginner/first");
    expect(screen.getByText("15 min")).toBeInTheDocument();

    const secondLink = screen.getByText("Second lesson").closest("a");
    expect(secondLink).toHaveAttribute("href", "/course/beginner/second");
    expect(screen.getByText("30 min")).toBeInTheDocument();
  });

  it("does not show a Done badge for incomplete lessons", () => {
    renderGrid();
    expect(screen.queryByText("✓ Done")).not.toBeInTheDocument();
  });

  it("shows a Done badge only for lessons marked complete in progress state", async () => {
    localStorage.setItem(
      "sorolearn-progress",
      JSON.stringify({ completed: { "beginner/first": true } })
    );
    renderGrid();

    await waitFor(() => expect(screen.getAllByText("✓ Done")).toHaveLength(1));
    const doneBadge = screen.getByText("✓ Done");
    expect(doneBadge.closest("a")).toHaveAttribute("href", "/course/beginner/first");
  });
});
