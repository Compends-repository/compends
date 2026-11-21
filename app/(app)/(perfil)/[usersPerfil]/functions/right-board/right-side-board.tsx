"use client";

import { IconPlus } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";

import Board from "./functions/components";


export default function Right_Side_Board() {
  const [opt1, setOpt1] = useState(false);

  return (
    <motion.div
      className="relative flex bg-[#ffffff]/5 ml-[25%] mt-[5%] w-[35%] h-[60%] min-w-0 min-h-0 border border-dashed rounded-[30px] border-[#ececec63] justify-center items-center text-white font-semibold text-[20px] gap-3 overflow-hidden"
      initial={{ scale: 1 }}
      whileHover={!opt1 ? {
        scale: 1.06,
        backgroundColor: "#ffffff1c",
        cursor: "pointer"
      } : {}}
    >
      {!opt1 ? (
        <button
          onClick={() => setOpt1(true)}
          className="flex items-center gap-3"
        >
          <span className="flex w-12 h-12 rounded-[14px] justify-center items-center">
            <IconPlus stroke={2} />
          </span>
          Click here to add some stuff
        </button>
      ) : (
        <div className="flex w-full h-full min-w-0 min-h-0 p-4">
          <Board />
        </div>
      )}
    </motion.div>
  );
}