"use client";

import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { useState } from "react";
import CodeBlockHeader from "./CodeBlockHeader";

export default function CodeBlockNode({ node }: NodeViewProps) {
  const language = node.attrs.language;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textContent = node.textContent;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textContent);
      } else {
        // Fallback seguro caso a API não esteja disponível no contexto
        const textarea = document.createElement("textarea");
        textarea.value = textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar o código:", err);
    }
  };

  return (
    <NodeViewWrapper className="compends-code-block">
      <div className="compends-code-window">
        <CodeBlockHeader 
          language={language} 
          onCopy={handleCopy} 
          copied={copied} 
        />

        {/* Área de código do Tiptap */}
        <pre className="compends-code-pre">
          <NodeViewContent className="compends-code-content" />
        </pre>
      </div>
    </NodeViewWrapper>
  );
}