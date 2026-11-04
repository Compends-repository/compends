"use client";

import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CodeBlockHeaderProps {
  language: string | null;
  onCopy: () => void;
  copied: boolean;
}

const languageNames: Record<string, string> = {
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  csharp: "C#",
  cs: "C#",
  python: "Python",
  py: "Python",
  css: "CSS",
  scss: "SCSS",
  html: "HTML",
  json: "JSON",
  bash: "Bash",
  shell: "Shell",
  sql: "SQL",
  rust: "Rust",
};

export default function CodeBlockHeader({
  language,
  onCopy,
  copied,
}: CodeBlockHeaderProps) {
  const displayLanguage = language
    ? languageNames[language.toLowerCase()] ?? language
    : "Plain text";

  return (
    <div className="compends-code-header">

      <span className="compends-code-language">
        {displayLanguage}
      </span>

      <div className="compends-code-header-actions">
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 hover:bg-zinc-800 rounded-md transition-colors border border-zinc-700/50"
          title="Copiar código"
        >
          {copied ? (
            <>
              <IconCheck size={14} className="text-emerald-400" />
              <span className="text-emerald-400">Copiado!</span>
            </>
          ) : (
            <>
              <IconCopy size={14} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}