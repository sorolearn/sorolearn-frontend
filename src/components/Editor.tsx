"use client";

interface Props {
  defaultValue?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

/**
 * Code editor component — wraps Monaco Editor.
 * Monaco is loaded dynamically to avoid SSR issues.
 */
export default function Editor({ defaultValue = "", onChange, readOnly = false }: Props) {
  // TODO: replace textarea with @monaco-editor/react for full IDE experience
  return (
    <textarea
      defaultValue={defaultValue}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      spellCheck={false}
      className="w-full box-border h-56 resize-y bg-code-bg text-code-text border border-border rounded-card p-4 font-mono text-[13px] leading-relaxed outline-none"
    />
  );
}
