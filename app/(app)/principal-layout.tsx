"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import NavbarPerfil from "./(perfil)/navbar/navbarPerfil";
import NavbarPrincipal from "./(social-page)/all_social-page/navbar/NavbarPrincipal";
import { EditorProvider } from "@/app/(app)/(perfil)/functions/EditorContext"; // ajusta o caminho

import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };

import type { PublicUser } from "@/lib/types";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

type PrincipalLayoutProps = {
  children: React.ReactNode;
  session: Session;
  user: PublicUser;
};

export default function PrincipalLayout({
  children,
  session,
  user,
}: PrincipalLayoutProps) {
  const userId = session?.user?.id;
  const rotasPerfil = userId ? [`/${userId}`] : [];

  const style = new Style(definition2);
  const avatar = new Avatar(style, {
    seed: user.name ?? user.id ?? "usuario-padrao",
    size: 200,
    backgroundColor: [
      "43aa8b",
      "4d96ff",
      "b57bff",
      "ff8c42",
      "2ec4b6",
      "f15bb5",
      "f55151",
    ],
    skinColor: ["fffdfb"],
    hairColor: [
      "1b1b3a",
      "d90429",
      "0466c8",
      "007f5f",
      "7b2cbf",
      "f77f00",
      "006d77",
      "9d0208",
    ],
    eyebrowsColor: ["1b1b3a"],
    eyesColor: ["1b1b3a"],
    noseColor: ["1b1b3a"],
    mouthColor: ["1b1b3a"],
    frecklesColor: ["1b1b3a"],
    glassesColor: ["1b1b3a"],
    earringsColor: ["1b1b3a"],
    hairAccessoriesColor: ["1b1b3a"],
  });
  const fallbackAvatar = avatar.toDataUri();

  const pathname = usePathname();
  const isPerfil = rotasPerfil.some((r) => pathname.startsWith(r));
  const isOwner = session?.user.id === user?.id;

  return (
    <EditorProvider>
      {!isPerfil ? (
        <NavbarPrincipal
          session={session}
          user={user}
          avatar={fallbackAvatar}
        />
      ) : (
        <NavbarPerfil
          session={session}
          user={user}
          avatar={fallbackAvatar}
          isOwner={isOwner}
        />
      )}
      {children}
    </EditorProvider>
  );
}
