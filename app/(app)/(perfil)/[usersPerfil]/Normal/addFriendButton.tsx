"use client";

import { motion } from "motion/react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import CancelSendAddFriend from "../Dialogs/cancelSendAdd.tsx";
import {
  sendFriendRequest,
  acceptFriendRequest,
  removeFriendship,
} from "@/app/actions/friendship";
import type { FriendshipState } from "@/lib/types";

type Props = {
  targetId: string;
  state: FriendshipState;
};

const POSITION =
  "absolute top-[calc(50%+8vw)] left-[34%] sm:top-[calc(50%+4.6vw)] sm:left-[37%] h-sm:top-[calc(50%+4vw)] h-sm:left-[23.2%] 1xl:top-[calc(50%+8vw)] 2xl:top-[calc(50%+4vw)] 2xl:left-[23.2%] h-lg:top-[calc(50%+3vw)] h-lg:left-[19.9%] 3xl:top-[calc(50%+3vw)] 3xl:left-[19.9%] w-34 py-1.5 bg-white cursor-pointer text-[17px] font-semibold border border-[#bababaab] z-10";

export default function Add_friend_button({ targetId, state }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dots, setDots] = useState(1);

  const requestSent = state === "REQUEST_SENT";

  useEffect(() => {
    if (!requestSent) {
      setDots(1);
      return;
    }
    const id = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [requestSent]);
  
  if (state === "SELF") return null;

  const run = (action: () => Promise<void>) =>
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    });

  function onClickHandler() {
    if (state === "NONE") run(() => sendFriendRequest(targetId));
    else if (state === "REQUEST_RECEIVED") run(() => acceptFriendRequest(targetId));
    else setDialogOpen(true);
  }

  const label =
    state === "NONE"
      ? "Be Friends?"
      : state === "REQUEST_SENT"
        ? `Invite sent${".".repeat(dots)}`
        : state === "REQUEST_RECEIVED"
          ? "Accept invite"
          : "Friends";

  return (
    <>
      <motion.button
        className={POSITION}
        initial={{ borderRadius: 15 }}
        whileHover={{
          scale: 1.06,
          borderRadius: 10,
          fontWeight: "bolder",
          color: "#F9C74F",
        }}
        whileTap={{ scale: 1, borderRadius: 10 }}
        transition={{ type: "spring", stiffness: 700, damping: 25 }}
        disabled={pending}
        onClick={onClickHandler}
      >
        {pending ? <Spinner /> : label}
      </motion.button>

      <CancelSendAddFriend
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={() => {
          setDialogOpen(false);
          run(() => removeFriendship(targetId));
        }}
      />
    </>
  );
}