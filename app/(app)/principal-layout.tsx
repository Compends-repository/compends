"use client";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import DropdownMenuPerfil from "./dropdownMenu";
import NavbarPerfil from "./(perfil)/navbarPerfil";
import NavbarPrincipal from "./NavbarPrincipal";

type PrincipalLayoutProps = {
  children: React.ReactNode;
  session: {
    name: string;
    image?: string | null;
    email?: string | null;
    id: string;
  };
};

const rotasPerfil = ["/user_perfil-page"];

export default function PrincipalLayout({
  children,
  session,
}: PrincipalLayoutProps) {
  const pathname = usePathname();
  const isPerfil = rotasPerfil.some((r) => pathname.startsWith(r));

  const [clicked, setClicked] = useState(false);
  return (
    <>
      {!isPerfil ? (
        <NavbarPrincipal session={session} />
      ) : (
        <NavbarPerfil session={session} />
      )}
      {children}
    </>
  );
}
