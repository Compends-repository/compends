"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Text_info_user_list from "./text_informations";

type User = {
  name: string;
  Pimg: string;
  bio: string;
  id: number;
  Bimg: string;
};

type infoTypes = {
  GETusers: User[];
};

export default function User_Informations_List({ GETusers }: infoTypes) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <ul className="mt-[8%]">
      {(GETusers ?? []).map((user) => (
        <motion.li
          key={user.id}
          className="relative isolate pl-[6%] cursor-pointer"
          onHoverStart={() => setHoveredId(user.id)}
          onHoverEnd={() => setHoveredId(null)}
          initial="rest"
          whileTap="tap"
          animate="rest"
          whileHover="hover"
        >
          <motion.div
            aria-hidden
            className="w-[96%] mx-auto absolute inset-x-0 bottom-0 top-[-40] -z-10 bg-cover bg-center bg-no-repeat pointer-events-none brightness-65 rounded-[35px] border border-[#dbdbdb6e] bg-black/6"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 }, tap: { scale: 0.95 } }}
            transition={{ duration: 0.15, ease: [0.42, 1, 0.46, 1] }}
          />

          <motion.img
            className="w-[200] mt-[4%] h-[200] object-cover object-center rounded-[30px] border border-[#dbdbdb6e] shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] pointer-events-none"
            src={user.Pimg}
            alt={user.bio} // name
            variants={{ tap: { scale: 0.85 } }}
            transition={{ duration: 0.15, ease: [0.42, 1, 0.46, 1] }}
          />
          <Text_info_user_list name={user.name} bio={user.bio} />
          <Separator
            className="w-[40%]! 2xl:mt-[13%] 3xl:mt-[11%] mt-[12%] mb-[4%] bg-chart-1 h-[1.8]!"
            style={{ opacity: hoveredId === user.id ? 0.5 : 1 }}
          />
        </motion.li>
      ))}
    </ul>
  );
}
