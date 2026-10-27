"use client";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import DropdownMenuPerfil from "../dropdownMenu";
import EditorMenu from "./editorMenu";

import { HugeiconsIcon } from "@hugeicons/react";
import { Edit03Icon } from "@hugeicons/core-free-icons";
import { EditOff03Icon } from "@hugeicons/core-free-icons";

import type { PublicUser } from "@/lib/types";

type PrincipalLayoutProps = {
  session: {
    name: string;
    image?: string | null;
    email?: string | null;
    id: string;
  };
  user: PublicUser
};

export default function NavbarPerfil({ session, user }: PrincipalLayoutProps) {
  const [clicked, setClicked] = useState(false);
  const [editorStarted, setEditorStarted] = useState(false);

  const toggleEditor = () => {
    if (clicked) return;
    setEditorStarted((prev) => !prev);
  };

  const toggleDropdown = () => {
    if (editorStarted) return;

    setClicked((prev) => !prev);
  };

  return (
    <>
      <header className="fixed z-50 top-[1.7%] left-[18%] right-[4.5%] flex items-start gap-[2%]">
        <nav className="flex-1 min-w-0 h-sm:h-[52] 2xl:h-[52] h-lg:h-[55] 3xl:h-[55] flex items-center gap-4 p-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d]">
          <img src="/logo/logo3.svg" className="w-[180] h-[50] shrink-0" />
          <Link href="/all_social-page" className="text-white ml-[300]">
            Social
          </Link>
          <Link href="/friends_discover-page" className="text-white">
            Discover
          </Link>
        </nav>

        {/* 
        
        
        
        */}

        <nav className="relative shrink-0 h-sm:h-[52] 2xl:h-[52] h-lg:h-[55] 3xl:h-[55] flex items-center p-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d]">
          <button
            onClick={toggleEditor}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              className="2xl:w-9 2xl:h-9 h-lg:w-10 h-lg:h-10 3xl:w-10 3xl:h-10 shrink-0 2xl:ml-[-7%] 3xl:ml-[-6%] bg-white 3xl:rounded-[13px] 2xl:rounded-[12px] bg-center bg-cover bg-no-repeat"
              src={user.avatar ?? user.image ?? "/default-avatar.png"}
            />
            {editorStarted ? (
              <HugeiconsIcon
                icon={EditOff03Icon}
                strokeWidth={3}
                className="absolute w-[14] h-[14] mt-[15%] ml-[10%] z-70"
              />
            ) : (
              <HugeiconsIcon
                icon={Edit03Icon}
                strokeWidth={3}
                className="absolute w-[14] h-[14] mt-[15%] ml-[10%] z-70"
              />
            )}
            <h2 className="font-Asap text-[17px] font-black">{session.name}</h2>
          </button>

          {editorStarted && <EditorMenu />}

          {clicked ? (
            <IconChevronUp
              onClick={toggleDropdown}
              stroke={1.5}
              className="shrink-0 ml-3 cursor-pointer hover:bg-[#9999991b] hover:rounded-[7px] hover:border border-[#cccdc717]"
            />
          ) : (
            <IconChevronDown
              onClick={toggleDropdown}
              stroke={1.5}
              className="shrink-0 ml-3 cursor-pointer hover:bg-[#9999991b] hover:rounded-[7px] hover:border border-[#cccdc717]"
            />
          )}

          {clicked && <DropdownMenuPerfil />}
        </nav>
      </header>
    </>
  );
}
