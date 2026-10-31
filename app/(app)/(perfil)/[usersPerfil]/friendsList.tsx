import { auth } from "@/lib/auth";
import { FriendPreview } from "@/lib/types";
import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import { motion, scale } from "motion/react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  isOwner: boolean;
  friends: FriendPreview[];
  received: FriendPreview[];
  sent: FriendPreview[];
};

export default function FriendsList({
  isOwner,
  friends,
  received,
  sent,
}: Props) {
  const style = new Style(definition);

  function getFallbackAvatar(seed: string) {
    return new Avatar(style, {
      seed,
      size: 120,
      backgroundColor: ["ffffff10"],
    }).toDataUri();
  }
  //
  return (
    <>
      <h2 className="absolute text-white mt-[7%] ml-[5%] text-[36px] font-Changa bg-[#00000006] rounded-lg">
        Friends
      </h2>
      <div className="mt-[10%] flex">
        <ul className="flex flex-nowrap gap-6 overflow-x-auto ml-[5%] 2xl:h-50 3xl:h-55 w-[190vh]">
          {friends.map((f) => (
            <Link key={f.id} href={`/${f.id}`}>
              <motion.li whileHover={{ scale: 1.08 }} className="mt-4 ml-4">
                <img
                  className="2xl:w-35 2xl:h-35 3xl:w-40 3xl:h-40 mb-3 2xl:rounded-[25px] 3xl:rounded-[30px] border-[#dbdbdb6e] border"
                  src={f.avatar ?? getFallbackAvatar(f.name ?? String(f.id))}
                  alt={f.name}
                />
                <p className="text-center text-white font-Asap">{f.name}</p>
              </motion.li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
