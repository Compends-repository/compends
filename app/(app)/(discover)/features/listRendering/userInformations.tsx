"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import Text_info_user_list from "./text_informations";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };

const style = new Style(definition2);

function getFallbackAvatar(seed: string) {
  return new Avatar(style, {
    seed,
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
  }).toDataUri();
}

export default function User_Informations_List({ GETusers }: any) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <ul className="mt-[8%]">
      {(GETusers ?? []).map((user: any) => (
        <Link key={user.id} href={`/${user.id}`} className="block">
          <motion.li
            key={user.id}
            className="relative isolate pl-[6%] cursor-pointer select-none"
            onHoverStart={() => setHoveredId(user.id)}
            onHoverEnd={() => setHoveredId(null)}
            initial="rest"
            whileTap="tap"
            animate="rest"
            whileHover="hover"
          >
            <motion.div
              aria-hidden
              className="w-[96%] mx-auto absolute inset-x-0 bottom-0 top-[-40] -z-10 bg-cover bg-center bg-no-repeat pointer-events-none brightness-65 rounded-[35px] border border-[#dbdbdb6e] bg-black/6 select-none"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
                tap: { scale: 0.95 },
              }}
              transition={{ duration: 0.15, ease: [0.42, 1, 0.46, 1] }}
            />

            <motion.img
              className="w-36.25 mt-[4%] h-37.5 object-cover object-center rounded-[30px] border border-[#dbdbdb6e] shadow-[2px_2px_10px_0px_rgba(0,0,0,0.09)] pointer-events-none select-none"
              src={
                user.avatar ?? getFallbackAvatar(user.name ?? String(user.id))
              }
              alt={user.name}
              variants={{ tap: { scale: 0.85 } }}
              transition={{ duration: 0.15, ease: [0.42, 1, 0.46, 1] }}
            />

            <Text_info_user_list name={user.name} bio={user.bio} />
            <Separator
              className="w-[40%]! 2xl:mt-[11%] 3xl:mt-[9%] mt-[12%] mb-[4%] bg-chart-1 h-[1.8]! select-none"
              style={{ opacity: hoveredId === user.id ? 0.5 : 1 }}
            />
          </motion.li>
        </Link>
      ))}
    </ul>
  );
}
