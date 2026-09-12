import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders the fill at the given percent when no label is given", () => {
    const { container } = render(<ProgressBar percent={40} />);
    expect(screen.queryByText("40%")).not.toBeInTheDocument();
    const fill = container.querySelector(".bg-accent") as HTMLElement;
    expect(fill.style.width).toBe("40%");
  });

  it("shows the label and percentage when a label is given", () => {
    render(<ProgressBar percent={62} label="Beginner path" />);
    expect(screen.getByText("Beginner path")).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
  });

  it("clamps values above 100 down to 100", () => {
    render(<ProgressBar percent={150} label="Overshoot" />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps negative values up to 0", () => {
    render(<ProgressBar percent={-20} label="Undershoot" />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
