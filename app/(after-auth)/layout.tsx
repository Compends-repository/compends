"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { IconChevronDown } from '@tabler/icons-react';


export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  function onHandleClick() {
    router.push("/login");
  }
  return (
    <>
      <nav className="fixed z-50 top-[1.7%] left-1/2 -translate-x-1/2 h-[55] w-[60%] flex gap-4 p-4 backdrop-blur-3xl  backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d] border-b-1.5">
        <img src="/logo/logo3.svg" className="w-[180] h-[50] mt-[-1.2%]" />
        <Link href="/user_perfil-page" className="text-white ml-[200]">
          Perfil
        </Link>
        <Link href="/all_social-page" className="text-white">
          Social
        </Link>
        <Link href="/friends_discover-page" className="text-white">
          Discover
        </Link>
        <motion.button
          onClick={onHandleClick}
          className="cursor-pointer hover:text-red-500 hover:-translate-y-1 hover:font-bold"
        >
          Log out
        </motion.button>
      </nav>
      <nav className="fixed z-50 top-[1.7%] ml-[90%] -translate-x-1/2 h-[55] w-[12%] flex gap-4 p-4 backdrop-blur-3xl  backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d] border-b-1.5 items-center">
        <div
          className="w-10 h-10 bg-white shrink-0 rounded-[13px] ml-[-4%] bg-center bg-fixed bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/CapsuleDraft.webp')" }}
        ></div>
        <h2 className="shrink-0 ml-[-1.5%] font-roboto text-[17px] font-bold">
          @Luninjag
        </h2>
        <IconChevronDown stroke={1.5} className="ml-[12%] shrink-0"/>
      </nav>
      {children}
    </>
  );
}
