"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FieldDescription } from "@/components/ui/field";

import { Spinner } from "@/components/ui/spinner";
import CancelSendAddFriend from "../Dialogs/cancelSendAdd.tsx";


type Props = {
  isOwner: boolean;
}

export default function Add_friend_button({ isOwner}: Props ) {

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
      {isOwner ? null : ( <motion.button
        className="absolute top-[calc(50%+8vw)] left-[34%] sm:top-[calc(50%+4.6vw)] sm:left-[37%] h-sm:top-[calc(50%+4vw)] h-sm:left-[23.2%] 1xl:top-[calc(50%+8vw)] 2xl:top-[calc(50%+4vw)] 2xl:left-[23.2%] h-lg:top-[calc(50%+3vw)] h-lg:left-[19.9%] 3xl:top-[calc(50%+3vw)] 3xl:left-[19.9%] w-34 py-1.5 bg-white cursor-pointer text-[17px] font-semibold border border-[#bababaab] z-10"
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
      </motion.button> )}

      <CancelSendAddFriend
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={() => setWasClicked(false)}
      />
    </>
  );
}
