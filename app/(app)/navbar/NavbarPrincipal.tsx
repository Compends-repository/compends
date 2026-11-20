import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import DropdownMenuPerfil from "../components/dropdownMenu";

import type { PublicUser } from "@/lib/types";

import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

type PrincipalLayoutProps = {
  session: Session;
  user: PublicUser;
  avatar: string;
};

export default function NavbarPrincipal({
  session,
  user,
  avatar,
}: PrincipalLayoutProps) {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <header className="fixed z-50 top-[1.7%] left-[18%] right-[4.5%] flex items-start gap-[2%]">
        <nav className="flex-1 min-w-0 h-[52px] h-xsm:h-[52px] h-sm:h-[52px] md:h-[52px] 2xl:h-[52px] h-lg:h-[55px] 3xl:h-[55px] flex items-center gap-4 px-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d]">
          <img
            src="/logo/logo3.svg"
            className="w-[180px] h-[50px] max-h-[calc(100%-4px)] object-contain shrink-0"
          />
          <Link href="/all_social-page" className="text-white ml-[300px]">
            Social
          </Link>
          <Link href="/friends_discover-page" className="text-white">
            Discover
          </Link>
        </nav>

        <nav className="relative shrink-0 h-[52px] h-xsm:h-[52px] h-sm:h-[52px] md:h-[52px] 2xl:h-[52px] h-lg:h-[55px] 3xl:h-[55px] flex items-center px-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d]">
          <Link
            href={`/${session?.user.id}`}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              className="w-8 h-8 sm:w-9 sm:h-9 sm:rounded-[12px] sm:ml-[-7%] 2xl:w-9 2xl:h-9 h-lg:w-10 h-lg:h-10 3xl:w-10 3xl:h-10 shrink-0 2xl:ml-[-7%] 3xl:ml-[-6%] 3xl:rounded-[13px] 2xl:rounded-[12px] object-cover object-center"
              src={user.avatar ?? user.image ?? avatar ?? "/default-avatar.png"}
              alt={session?.user.name ?? "Avatar"}
            />
            <h2 className="font-Asap text-[17px] font-black max-w-[100px] truncate">
              {session?.user.name}
            </h2>
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
    </>
  );
}
