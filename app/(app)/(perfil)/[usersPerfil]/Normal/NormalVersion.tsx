"use client";

import { IconArrowAutofitUp } from "@tabler/icons-react";
import { motion } from "motion/react";
import Add_friend_button from "./addFriendButton";
import Main_perfil_image from "./profileInformations";
import type { PublicUser } from "@/lib/types";

import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

type Props = {
  onToggle: () => void;
  session: Session | null;
  user: PublicUser;
  isOwner: boolean;
  editorStarted: boolean;
};

export default function NormalPerfilDivVersion({
  onToggle,
  session,
  user,
  isOwner,
  editorStarted
}: Props) {
  return (
    <div className="w-full h-[calc((100vh-90px)*0.506+90px)] flex items-center sticky top-0 z-20 backdrop-blur-[3px] backdrop-brightness-95 bg-black/10 border-b-2 rounded-b-[45px] border-[#ececec63] no-scrollbar shadow-[3px_6px_15px_0px_rgba(0,0,0,0.38)] contrast-125">
      <div className="flex items-center gap-6">
        <Main_perfil_image session={session} user={user} isOwner={isOwner} editorStarted={editorStarted}/>
        <Add_friend_button isOwner={isOwner} />
      </div>
      <motion.button
        onClick={onToggle}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        whileHover={{ scale: 1.13 }}
      >
        <IconArrowAutofitUp className="w-[30] h-[30]" />
      </motion.button>
    </div>
  );
}
