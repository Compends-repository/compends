"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { IconPencil, IconArrowBackUp, IconTrash } from "@tabler/icons-react";

import { Tooltip } from "@/components/ui/tooltip-card";

import {
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";

import { SignaturePad } from "@/app/(app)/components/signature-pad";
import { encodeSignature, type Stroke } from "@/lib/signature";

import type { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
  editorStarted: boolean;
};

const loadBioEditor = () =>
  import("../functions/bio-editor").then((m) => m.BioEditor);

const BioEditor = dynamic(loadBioEditor, {
  ssr: false,
  loading: () => (
    <div className="min-h-32 px-4 py-3 text-sm text-zinc-400">
      Carregando editor...
    </div>
  ),
});

export default function EditBio_OnPerfil({ session, editorStarted }: Props) {
  const router = useRouter();

  async function handleSave(bio: string) {
    const { data, error } = await authClient.updateUser({ bio });
    console.log("updateUser", { bio, data, error });
    if (error) return;
    router.refresh();
  }

  if (!editorStarted) return null;

  const contentDrop = `Edit your bio\nClick the button to open the editor screen and personalize your text`;

  return (
    <FloatingPanelRoot className="shrink-0 z-100">
      <Tooltip
        containerClassName="text-neutral-600 rounded-lg! dark:text-neutral-400"
        content={contentDrop}
      >
        <FloatingPanelTrigger
          className="w-9 h-9 p-0 justify-center cursor-pointer"
          title="Editar bio"
          animateLabel={false}
        >
          <IconPencil size={16} />
        </FloatingPanelTrigger>
      </Tooltip>

      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={handleSave} className="text-white">
          <BioEditor initialContent={session?.user?.bio} />
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

export function EditName_OnPerfil({ session, editorStarted }: Props) {
  const router = useRouter();
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  async function handleSave() {
    const signature = encodeSignature(strokes);
    if (!signature) return;
    const { error } = await authClient.updateUser({ signature });
    if (error) return;
    router.refresh();
  }

  const undo = () => setStrokes((s) => s.slice(0, -1));
  const clear = () => setStrokes([]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      undo();
    }
  }

  const contentDrop = `Edit your bio\nClick the button to open the editor screen and personalize your text`;

  return (
    <FloatingPanelRoot className="shrink-0 z-100">
      <Tooltip
        containerClassName="text-neutral-600 rounded-lg! dark:text-neutral-400"
        content={contentDrop}
      >
        <FloatingPanelTrigger
          className="w-9 h-9 p-0 justify-center cursor-pointer"
          title="Draw your signature here"
          animateLabel={false}
        >
          <IconPencil size={16} />
        </FloatingPanelTrigger>
      </Tooltip>

      <FloatingPanelContent className="w-100 h-100">
        <FloatingPanelForm onSubmit={handleSave} className="text-white">
          <div
            className="relative w-80 h-100 outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={(e) => e.currentTarget.focus()}
          >
            <SignaturePad
              strokes={strokes}
              onChange={setStrokes}
              className="w-[190%] h-full bg-[#262626] rounded-lg"
            />

            <div className="absolute top-2 right-2 flex gap-1.5">
              <button
                type="button"
                onClick={undo}
                disabled={!strokes.length}
                title="Desfazer (Ctrl+Z)"
                className="w-8 h-8 grid place-items-center rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <IconArrowBackUp size={16} />
              </button>
              <button
                type="button"
                onClick={clear}
                disabled={!strokes.length}
                title="Limpar tudo"
                className="w-8 h-8 grid place-items-center rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <IconTrash size={16} />
              </button>
            </div>
          </div>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}
