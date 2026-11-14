"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import NavbarPerfil from "./(perfil)/navbar/navbarPerfil";
import NavbarPrincipal from "./navbar/NavbarPrincipal";
import { EditorProvider } from "@/app/(app)/(perfil)/functions/EditorContext"; // ajusta o caminho
import NavbarDiscover from "./(discover)/navbar/navbarDiscover";

import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };
import definition3 from "@dicebear/styles/marbles.json" with { type: "json" };

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
  const rotasDiscover = `/friends_discover-page`;

  const style = new Style(definition3);
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
  });
  const fallbackAvatar = avatar.toDataUri();

  const pathname = usePathname();
  const isPerfil = rotasPerfil.some((r) => pathname.startsWith(r));
  const isDiscover =
    pathname === rotasDiscover || pathname.startsWith(`${rotasDiscover}/`);
  const isOwner = session?.user.id === user?.id;

  let navbar;
  if (isPerfil) {
    navbar = (
      <NavbarPerfil
        session={session}
        user={user}
        avatar={fallbackAvatar}
        isOwner={isOwner}
      />
    );
  } else if (isDiscover) {
    navbar = (
      <NavbarDiscover session={session} user={user} avatar={fallbackAvatar} />
    );
  } else {
    navbar = (
      <NavbarPrincipal session={session} user={user} avatar={fallbackAvatar} />
    );
  }

  return (
    <EditorProvider>
      {navbar}
      {children}
    </EditorProvider>
  );
}
