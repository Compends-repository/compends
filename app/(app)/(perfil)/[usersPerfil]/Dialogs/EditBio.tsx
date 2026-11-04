"use client";

import { useRouter } from "next/navigation";
import { IconPencil } from "@tabler/icons-react";

import {
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";

import type { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { BioEditor } from "../functions/bio-editor";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
  editorStarted: boolean;
};

export default function EditBio_OnPerfil({ session, editorStarted }: Props) {
  const router = useRouter();

  async function handleSave(bio: string) {
    const { error } = await authClient.updateUser({ bio });
    if (error) {
      console.log(error);
      return;
    }
    router.refresh();
  }

  if (!editorStarted) return null;

  return (
    <FloatingPanelRoot className="shrink-0 z-100">
      <FloatingPanelTrigger
        className="w-9 h-9 p-0 justify-center cursor-pointer"
        title="Editar bio"
        animateLabel={false}
      >
        <IconPencil size={16} />
      </FloatingPanelTrigger>

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
