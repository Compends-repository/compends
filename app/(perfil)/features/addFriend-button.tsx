"use client";

import { motion } from "motion/react";

export default function Add_friend_button() {
  return (
    <motion.button
      className="absolute h-lg:mt-[13.5vh] bg-white cursor-pointer h-sm:mt-[19.5vh] 2xl:mt-[14.5vh] 3xl:mt-[10.5vh] ml-[24.2vw] px-4 py-1.5 3xl:ml-[19vw] text-[18px] font-semibold font-saira"
      initial={{borderRadius: 4 }}
      whileHover={{scale: 1.06, borderRadius: 8, fontWeight: 'bolder' }}
      whileTap={{ scale: 1, borderRadius: 5}}
      transition={{ type: "spring", stiffness: 700, damping: 25}}
    >
      Add as friend
    </motion.button>
  );
}
