import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProgressProvider, useProgress } from "./progress-context";

function wrapper({ children }: { children: ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("useProgress", () => {
  it("throws when used outside a ProgressProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useProgress())).toThrow(
      "useProgress must be used within a ProgressProvider"
    );
    spy.mockRestore();
  });

  it("starts with the default state", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.theme).toBe("light");
    expect(result.current.completed).toEqual({});
    expect(result.current.walletAddress).toBeNull();
  });

  it("toggleTheme flips the theme and persists it", async () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("light"));

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("dark");

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("dark"));
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem("sorolearn-progress")!);
      expect(stored.theme).toBe("dark");
    });
  });

  it("restores persisted state on mount", async () => {
    localStorage.setItem(
      "sorolearn-progress",
      JSON.stringify({ theme: "dark", completed: { "beginner/first-contract": true } })
    );
    const { result } = renderHook(() => useProgress(), { wrapper });
    await waitFor(() => expect(result.current.theme).toBe("dark"));
    expect(result.current.completed).toEqual({ "beginner/first-contract": true });
  });

  it("ignores malformed persisted state instead of crashing", async () => {
    localStorage.setItem("sorolearn-progress", "{not json");
    const { result } = renderHook(() => useProgress(), { wrapper });
    await waitFor(() => expect(result.current.theme).toBe("light"));
  });

  it("setCode/getCode round-trip per lesson id, independently of other ids", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.getCode("a", "fallback")).toBe("fallback");

    act(() => result.current.setCode("a", "my code"));
    expect(result.current.getCode("a", "fallback")).toBe("my code");
    expect(result.current.getCode("b", "other fallback")).toBe("other fallback");
  });

  it("unlockHint increments up to hintCount and no further", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.unlockHint("a", 2));
    expect(result.current.hintsShown["a"]).toBe(1);
    act(() => result.current.unlockHint("a", 2));
    expect(result.current.hintsShown["a"]).toBe(2);
    act(() => result.current.unlockHint("a", 2));
    expect(result.current.hintsShown["a"]).toBe(2);
  });

  it("setWalletAddress stores and clears the address", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    act(() => result.current.setWalletAddress("GABC..."));
    expect(result.current.walletAddress).toBe("GABC...");
    act(() => result.current.setWalletAddress(null));
    expect(result.current.walletAddress).toBeNull();
  });

  describe("runTests", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("marks the lesson complete and clears messages on pass", () => {
      const { result } = renderHook(() => useProgress(), { wrapper });
      act(() => result.current.runTests("a", "anything", {}));
      expect(result.current.testStatus["a"]).toBe("running");

      act(() => vi.advanceTimersByTime(500));
      expect(result.current.testStatus["a"]).toBe("pass");
      expect(result.current.testMessages["a"]).toEqual([]);
      expect(result.current.completed["a"]).toBe(true);
    });

    it("does not mark the lesson complete and surfaces messages on fail", () => {
      const { result } = renderHook(() => useProgress(), { wrapper });
      act(() => result.current.runTests("a", "", {}));
      act(() => vi.advanceTimersByTime(500));

      expect(result.current.testStatus["a"]).toBe("fail");
      expect(result.current.testMessages["a"]).toEqual(["The editor is empty."]);
      expect(result.current.completed["a"]).toBeUndefined();
    });
  });
});
