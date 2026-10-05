//import Home from "./page";
import Image from "next/image";

export default async function enterPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   "use client";
import Image from "next/image";
import { AnimatePresence, color, motion, scale } from "motion/react";

import FormLabels from "./labels";
import { style } from "motion/react-client";
import { useState } from "react";

export default function LoginPage() {
  const [appear, setAppear] = useState(false);

  function handleClick() {
    setAppear((appear) => !appear);
  }

  return (
    <>
      <motion.button
        className="w-[190px] h-[60px] m-[30px] bg-red-500 hover:bg-red-600 text-white text-[22px] rounded-[29px] shadow-md hover:shadow-2xl transition-all duration-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        onClick={handleClick}
      >
        {" "}
        Tap here
      </motion.button>

      <AnimatePresence>
        {appear && (
          <motion.div
            className="w-[400px] h-[300px] bg-amber-500 m-[140px] text-white text-[30px] text-center flex items-center justify-center rounded-[15px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            Olá mundo
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

}
