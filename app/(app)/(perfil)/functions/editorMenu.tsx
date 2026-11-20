"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function EditorMenu() {
  const router = useRouter();

  const asyncLogOutHandler = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.log("signOut falhou: ", error);
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <div
      className="absolute z-50 top-[calc(100%+8px)] right-0 min-h-[155px] w-full min-w-[160px] p-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-white/13 rounded-[20px] text-white border border-[#cccdc76d] select-none text-right justify-end"
    >
      <ul className="text-right justify-end">
        <li>
          <p
            className="text-sm !text-right text-[13.5px]!"
            style={{ textAlign: "right" }}
          >
            Right click on the screen to change the background
          </p>
        </li>
      </ul>
    </div>
  );
}