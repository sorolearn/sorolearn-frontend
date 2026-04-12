"use client";

import { useRef } from "react";

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
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // TODO: replace textarea with @monaco-editor/react for full IDE experience
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-900 px-4 py-2 text-xs text-gray-500 border-b border-gray-700">
        main.rs
      </div>
      <textarea
        ref={editorRef}
        defaultValue={defaultValue}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-gray-950 text-gray-100 font-mono text-sm p-4 outline-none resize-none min-h-64"
        spellCheck={false}
      />
    </div>
  );
}
