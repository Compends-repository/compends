// Main_perfil_div.tsx
"use client";

import { IconArrowDownFromArc } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "./footer.tsx";
import Add_friend_button from "./Normal/addFriendButton.tsx";
import NormalPerfilDivVersion from "./Normal/NormalVersion.tsx";
import Main_perfil_image from "./Normal/profileInformations.tsx";
import ReducedPerfilDivVersion from "./Reduced/ReducedVersion.tsx";
import FriendsList from "./friendsList.tsx";

import type { auth } from "@/lib/auth";
import type { FriendPreview, FriendshipState, PublicUser } from "@/lib/types";

import { useEditor } from "@/app/(app)/(perfil)/EditorContext.tsx";
import FileInput from "@/app/actions/fileUpload.tsx";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Upload } from "lucide-react";
import { ComicText } from "@/components/ui/comic-text.tsx";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
  user: PublicUser;
  isOwner: boolean;
  friendship: FriendshipState;
  friends: FriendPreview[];
  received: FriendPreview[];
  sent: FriendPreview[];
};

export default function Main_perfil_div({
  session,
  user,
  isOwner,
  friendship,
  friends,
  received,
  sent,
}: Props) {
  const [isReduced, setIsReduced] = useState(false);
  const router = useRouter();

  const { editorStarted } = useEditor();

  const onClickChangeDiminuted = () => {
    setIsReduced((prev) => !prev);
  };

  async function enviar(file: File, field: "avatar" | "background") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field", field);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.refresh();
  }

  const content = (
    <>
      <div
        className="fixed inset-0 -z-100 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${user.background ?? "/perfilBackExample.png"}')`,
        }}
      />
      <div className="fixed inset-0 -z-100 bg-black/20 backdrop-blur-sm" />

      <div>
        {isReduced ? (
          <ReducedPerfilDivVersion
            onToggle={onClickChangeDiminuted}
            session={session}
            user={user}
          />
        ) : (
          <NormalPerfilDivVersion
            onToggle={onClickChangeDiminuted}
            session={session}
            user={user}
            isOwner={isOwner}
            editorStarted={editorStarted}
            friendship={friendship}
          />
        )}

        <FriendsList
          friends={friends}
          received={received}
          sent={sent}
          isOwner={isOwner}
        />

        <div className="h-300 pointer-events-none" />
      </div>

      <div className="h-[200] pointer-events-none" aria-hidden />
      <Footer />
    </>
  );

  return (
    <div className="relative isolate">
      <FileInput
        id="wallpaper-file-input"
        onSelect={(file) => enviar(file, "background")}
      />

      {isOwner && editorStarted ? (
        <ContextMenu>
          <ContextMenuTrigger>
            <div>{content}</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <label 
                htmlFor="wallpaper-file-input" 
                className="flex gap-2 cursor-pointer items-center w-full"
              >
                <Upload size={18} />
                <span>Change Wallpaper</span>
              </label>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        content
      )}
    </div>
  );
}

function ToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white cursor-pointer bg-black/20"
    >
      <IconArrowDownFromArc className="w-[35] h-[35]" />
    </button>
  );
}