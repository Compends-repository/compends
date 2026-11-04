"use client";

import { useEffect, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { CodeBlockExtension } from "@/components/tiptap-node/code-block-node";

import { IconCode } from "@tabler/icons-react";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { CodeBlock } from "@tiptap/extension-code-block";

import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
// ADICIONE ESTA LINHA ABAIXO (ajuste o caminho correto da sua pasta):
import "@/components/tiptap-node/code-block-node/code-block-node.scss";

import { useFloatingPanel } from "@/components/ui/floating-panel";
import { createPortal } from "react-dom";

type Props = {
  initialContent?: string | null;
};

export function BioEditor({ initialContent }: Props) {
  const { setNote } = useFloatingPanel();

  const editor = useEditor({
    immediatelyRender: false,
    content: initialContent ?? "",
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),

      CodeBlockExtension,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-32 px-4 py-3 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setNote(editor.isEmpty ? "" : editor.getHTML());
    },
  });

  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const { from, to, empty } = editor.state.selection;
      if (empty || !editor.isEditable) {
        setMenuPos(null);
        return;
      }
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);
      const left =
        (Math.min(start.left, end.left) + Math.max(start.right, end.right)) / 2;
      setMenuPos({ top: start.top - 8, left });
    };

    editor.on("selectionUpdate", update);
    editor.on("update", update);
    window.addEventListener("resize", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("update", update);
      window.removeEventListener("resize", update);
    };
  }, [editor]);

  useEffect(() => {
    setNote(initialContent ?? "");
  }, [initialContent, setNote]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="bio-editor-scroll">
        <EditorContent editor={editor} />
      </div>

      {editor &&
        menuPos &&
        createPortal(
          <div
            className="bio-bubble-menu flex w-max items-center gap-1 rounded-lg bg-zinc-700 p-1 shadow-lg"
            style={{
              position: "fixed",
              top: menuPos.top,
              left: menuPos.left,
              transform: "translate(-50%, -100%)",
              zIndex: 100,
            }}
          >
            <ToolbarGroup className="text-white cursor-pointer">
              <MarkButton type="bold" />
              <MarkButton type="italic" />
              <MarkButton type="strike" />
              <MarkButton type="underline" />
              <LinkPopover />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup className="cursor-pointer">
              <HeadingDropdownMenu levels={[1, 2, 3]} />
              <ListDropdownMenu types={["bulletList", "orderedList"]} />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <TextAlignButton align="left" />
              <TextAlignButton align="center" />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <button
                type="button"
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .toggleCodeBlock({ language: "javascript" })
                    .run()
                }
                className="rounded px-2 py-1 text-white hover:bg-zinc-600"
                title="Code block"
              >
                <IconCode stroke={2} />
              </button>
            </ToolbarGroup>
          </div>,
          document.body,
        )}
    </EditorContext.Provider>
  );
}
