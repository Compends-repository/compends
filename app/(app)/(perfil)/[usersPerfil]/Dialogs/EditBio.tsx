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

import React, { useRef } from "react";
import Signature, { SignatureRef } from "@uiw/react-signature";

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

export function EditName_OnPerfil({ session, editorStarted }: Props) {
  const router = useRouter();

  const $svg = useRef<SignatureRef>(null);
  const handle = (evn: any) => $svg.current?.clear();

  async function handleSave() {
    const svgEl = $svg.current?.svg;
    if (!svgEl) return;

    // nada desenhado
    if (!svgEl.querySelector("path")) return;

    const STROKE = 3;
    const PAD = STROKE + 2; // margem pra o traço grosso não ser cortado

    // bounding box de todos os traços, medido no SVG real (no DOM)
    const box = svgEl.getBBox();
    const x = box.x - PAD;
    const y = box.y - PAD;
    const w = box.width + PAD * 2;
    const h = box.height + PAD * 2;

    const clone = svgEl.cloneNode(true) as SVGSVGElement;

    clone.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
    clone.setAttribute("width", String(w));
    clone.setAttribute("height", String(h));
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.removeAttribute("class");
    clone.removeAttribute("style");

    clone.querySelectorAll("path").forEach((p) => {
      p.setAttribute("fill", "#fff");
      p.setAttribute("stroke", "#fff");
      p.setAttribute("stroke-width", String(STROKE));
      p.setAttribute("stroke-linejoin", "round");
      p.setAttribute("stroke-linecap", "round");
    });

    const signature = new XMLSerializer().serializeToString(clone);

    const { error } = await authClient.updateUser({ signature });
    if (error) return;
    router.refresh();
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
          <Signature
            ref={$svg}
            fill="white"
            className="w-80 h-100 bg-[#262626]! rounded-8"
          />
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}
