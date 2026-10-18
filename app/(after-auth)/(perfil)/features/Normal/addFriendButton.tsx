"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import CancelSendAddFriend from "../Dialogs/cancelSendAdd.tsx";

import { Spinner } from "@/components/ui/spinner"
import { FieldDescription } from "@/components/ui/field";


export default function Add_friend_button() {
  const [wasClicked, setWasClicked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (!wasClicked) {
      setDots(1);
      return;
    }
    const id = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [wasClicked]);

  async function onClickHandler() {
    if (!wasClicked) {
      return setWasClicked(true);
    } else {
      setDialogOpen(true);
    }
  }

  return (
    <>
      <motion.button
        className="bg-white cursor-pointer h-sm:mt-[12.3%] 1xl:mt-[8%] 2xl:mt-[9.7%] h-lg:mt-[7.7%] h-lg:ml-[-17.4%] 3xl:mt-[7.8%] ml-[-21.8%] w-34 py-1.5 3xl:ml-[-17.4%] text-[17px] font-semibold border-[#bababaab] border-[1] mt-[8%] z-10"
        initial={{ borderRadius: 15 }}
        whileHover={{
          scale: 1.06,
          borderRadius: 10,
          fontWeight: "bolder",
          color: "#F9C74F",
        }}
        whileTap={{ scale: 1, borderRadius: 10 }}
        transition={{ type: "spring", stiffness: 700, damping: 25 }}
        onClick={onClickHandler}
      >
        {wasClicked
          ? dots === 1
            ? "Invite sent."
            : dots === 2
              ? "Invite sent.."
              : dots === 3
                ? "Invite sent..."
                : ""
          : "Be Friends?"}
      </motion.button>

      <CancelSendAddFriend
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={() => setWasClicked(false)}
      />
    </>
  );
}
