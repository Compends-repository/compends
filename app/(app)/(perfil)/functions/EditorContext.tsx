"use client";

import { createContext, useContext, useState } from "react";

type EditorContextType = {
  editorStarted: boolean;
  setEditorStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editorStarted, setEditorStarted] = useState(false);

  return (
    <EditorContext.Provider value={{ editorStarted, setEditorStarted }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor precisa estar dentro de EditorProvider");
  return ctx;
}