"use client";

import { IconArrowDownFromArc } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Footer from "./footer.tsx";
import Add_friend_button from "./Normal/addFriendButton.tsx";
import NormalPerfilDivVersion from "./Normal/NormalVersion.tsx";
import Main_perfil_image from "./Normal/profileInformations.tsx";
import ReducedPerfilDivVersion from "./Reduced/ReducedVersion.tsx";

import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export default function Main_perfil_div({
  session,
}: {
  session: Session | null;
}) {
  const [isReduced, setIsReduced] = useState(false);

  const onClickChangeDiminuted = () => {
    setIsReduced((prev) => !prev);
  };

  return (
    <div className="relative isolate">
      {/* Background: fecha sozinho, sem filhos */}
      <div
        className="fixed inset-0 -z-100 bg-cover bg-center bg-no-repeat brightness-78"
        style={{ backgroundImage: "url('/perfilBackExample.png')" }}
      />

      {/* Wrapper: o header só gruda aqui dentro */}
      <div>
        {isReduced ? (
          <ReducedPerfilDivVersion
            onToggle={onClickChangeDiminuted}
            session={session}
          />
        ) : (
          <NormalPerfilDivVersion
            onToggle={onClickChangeDiminuted}
            session={session}
          />
        )}

        <div className="h-300 pointer-events-none" />
      </div>

      {/* Distância entre a base do header e o footer */}
      <div className="h-[200] pointer-events-none" aria-hidden />

      <Footer />
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
