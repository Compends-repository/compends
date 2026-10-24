"use client";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DropdownMenuPerfil from "./dropdownMenu";


type PrincipalLayoutProps = {
  children: React.ReactNode;
  session: {
    name: string,
    image?: string | null;
    email?: string | null;
    id: string;
  }
}

export default function PrincipalLayout({ children, session }: PrincipalLayoutProps) {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <header className="fixed z-50 top-[1.7%] left-[18%] right-[4.5%] flex items-start gap-[2%]">
        <nav className="flex-1 min-w-0 h-[55] flex items-center gap-4 p-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d]">
          <img src="/logo/logo3.svg" className="w-[180] h-[50] shrink-0" />
          <Link href="/all_social-page" className="text-white ml-[300]">
            Social
          </Link>
          <Link href="/friends_discover-page" className="text-white">
            Discover
          </Link>
        </nav>

        <nav className="relative shrink-0 h-[55] flex items-center p-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d]">
          <Link href="/user_perfil-page" className="flex items-center gap-3 cursor-pointer">
            <div
              className="w-10 h-10 shrink-0 ml-[-5%] bg-white rounded-[13px] bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: "url('/CapsuleDraft.webp')" }}
            />
            <h2 className="font-Asap text-[17px] font-black">{session.name}</h2>
          </Link>

          {clicked ? (
            <IconChevronUp
              onClick={() => setClicked(false)}
              stroke={1.5}
              className="shrink-0 ml-3 cursor-pointer hover:bg-[#9999991b] hover:rounded-[7px] hover:border border-[#cccdc717]"
            />
          ) : (
            <IconChevronDown
              onClick={() => setClicked(true)}
              stroke={1.5}
              className="shrink-0 ml-3 cursor-pointer hover:bg-[#9999991b] hover:rounded-[7px] hover:border border-[#cccdc717]"
            />
          )}

          {clicked ? <DropdownMenuPerfil /> : null}
        </nav>
      </header>
      {children}
    </>
  );
}
