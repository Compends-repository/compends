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
import definition3 from '@dicebear/styles/marbles.json' with { type: 'json' };

const style = new Style(definition3);

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

            <motion.div
              className="relative isolate w-36.25 h-37.5 mt-[4%] rounded-[41px] pointer-events-none select-none"
              variants={{ tap: { scale: 0.85 } }}
              transition={{ duration: 0.15, ease: [0.42, 1, 0.46, 1] }}
            >

              {/* forma */}
              <div className="relative isolate flex h-full w-full overflow-hidden rounded-[40px] border border-[#dbdbdb6e] shadow-[0_1.5px_4.5px_rgba(0,0,0,0.2)]">
                <img
                  src={
                    user.avatar ??
                    getFallbackAvatar(user.name ?? String(user.id))
                  }
                  alt={user.name}
                  className="h-full w-full object-cover object-center select-none"
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/25 via-transparent to-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                />
              </div>
            </motion.div>

            <Text_info_user_list name={user.name} bio={user.bio} />
            <Separator
              className="w-[40%]! mt-[10%] 2xl:mt-[11%] 3xl:mt-[9%] mb-[4%] bg-chart-1 h-[1.8]! select-none"
              style={{ opacity: hoveredId === user.id ? 0.5 : 1 }}
            />
          </motion.li>
        </Link>
      ))}
    </ul>
  );
}
