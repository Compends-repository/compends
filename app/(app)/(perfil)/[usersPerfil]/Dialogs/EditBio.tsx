"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { IconPencil } from "@tabler/icons-react";

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

import type { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

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