"use client";

import MonacoEditor, { type BeforeMount, type OnMount } from "@monaco-editor/react";

interface Props {
  defaultValue?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  /** Which site theme to match the editor chrome to. Defaults to "light". */
  theme?: "light" | "dark";
}

// Mirrors the --color-code-bg/--color-code-text tokens in globals.css. Monaco
// needs literal colors (it can't read CSS custom properties), so these are
// kept in sync by hand rather than computed at runtime.
const THEME_COLORS = {
  light: { background: "#16181d", foreground: "#e7ecf5" },
  dark: { background: "#000000", foreground: "#e7ecf5" },
} as const;

const beforeMount: BeforeMount = (monaco) => {
  for (const [name, colors] of Object.entries(THEME_COLORS)) {
    monaco.editor.defineTheme(`sorolearn-${name}`, {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": colors.background,
        "editor.foreground": colors.foreground,
      },
    });
  }
};

const handleMount: OnMount = (editor) => {
  editor.updateOptions({ minimap: { enabled: false } });
};

/**
 * Code editor — Monaco with Rust syntax highlighting, themed to match the
 * site's code-bg/code-text tokens for the current light/dark theme.
 */
export default function Editor({ defaultValue = "", onChange, readOnly = false, theme = "light" }: Props) {
  return (
    <div className="rounded-card overflow-hidden border border-border">
      <MonacoEditor
        height="224px"
        defaultLanguage="rust"
        defaultValue={defaultValue}
        theme={`sorolearn-${theme}`}
        beforeMount={beforeMount}
        onMount={handleMount}
        onChange={(value) => onChange?.(value ?? "")}
        options={{
          readOnly,
          fontSize: 13,
          fontFamily: "ui-monospace, 'Courier New', monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}
