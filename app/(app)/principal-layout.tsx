"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import NavbarPerfil from "./(perfil)/navbarPerfil";
import NavbarPrincipal from "./NavbarPrincipal";
import { EditorProvider } from "@/app/(app)/(perfil)/EditorContext.tsx"; // ajusta o caminho

import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };

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

  const style = new Style(definition);
  const avatar = new Avatar(style, {
    seed: user.name ?? user.id ?? "usuario-padrao",
    size: 200,
  });
  const fallbackAvatar = avatar.toDataUri();

  const pathname = usePathname();
  const isPerfil = rotasPerfil.some((r) => pathname.startsWith(r));
  const isOwner = session?.user.id === user?.id;

  return (
    <EditorProvider>
      {!isPerfil ? (
        <NavbarPrincipal session={session} user={user} avatar={fallbackAvatar} />
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