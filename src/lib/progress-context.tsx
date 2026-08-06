"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type TestStatus = "running" | "pass" | "fail";

interface ProgressState {
  theme: Theme;
  completed: Record<string, boolean>;
  code: Record<string, string>;
  testStatus: Record<string, TestStatus>;
  hintsShown: Record<string, number>;
  walletAddress: string | null;
}

const STORAGE_KEY = "sorolearn-progress";

const DEFAULT_STATE: ProgressState = {
  theme: "light",
  completed: {},
  code: {},
  testStatus: {},
  hintsShown: {},
  walletAddress: null,
};

interface ProgressContextValue extends ProgressState {
  toggleTheme: () => void;
  getCode: (lessonId: string, fallback: string) => string;
  setCode: (lessonId: string, value: string) => void;
  runTests: (lessonId: string, code: string) => void;
  unlockHint: (lessonId: string, hintCount: number) => void;
  setWalletAddress: (address: string | null) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage during render would mismatch the server-rendered
    // DEFAULT_STATE markup, so this syncs in after mount instead.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {
      // ignore malformed local storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.documentElement.dataset.theme = state.theme;
  }, [state, hydrated]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...state,
      toggleTheme: () =>
        setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" })),
      getCode: (lessonId, fallback) => state.code[lessonId] ?? fallback,
      setCode: (lessonId, value) =>
        setState((s) => ({ ...s, code: { ...s.code, [lessonId]: value } })),
      runTests: (lessonId, code) => {
        setState((s) => ({ ...s, testStatus: { ...s.testStatus, [lessonId]: "running" } }));
        setTimeout(() => {
          const didPass = code.includes("impl") && code.trim().length > 20;
          setState((s) => ({
            ...s,
            testStatus: { ...s.testStatus, [lessonId]: didPass ? "pass" : "fail" },
            completed: didPass ? { ...s.completed, [lessonId]: true } : s.completed,
          }));
        }, 900);
      },
      unlockHint: (lessonId, hintCount) =>
        setState((s) => {
          const shown = s.hintsShown[lessonId] ?? 0;
          if (shown >= hintCount) return s;
          return { ...s, hintsShown: { ...s.hintsShown, [lessonId]: shown + 1 } };
        }),
      setWalletAddress: (address) => setState((s) => ({ ...s, walletAddress: address })),
    }),
    [state]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
