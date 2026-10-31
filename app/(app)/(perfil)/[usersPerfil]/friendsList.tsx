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
    return new Avatar(style, { seed, size: 120, backgroundColor: ["ffffff10"] }).toDataUri();
  }
  //
  return (
    <div className="mt-[10%] flex ">
      <ul className="flex flex-nowrap gap-12 overflow-x-auto ml-[5%] h-70 w-[142vh]">
        {friends.map((f) => (
          <Link key={f.id} href={`/${f.id}`}>
            <motion.li
            whileHover={{ scale: 1.1}}
            className="mt-4 ml-4"
            >
              <img className="w-40 h-40 mb-3 rounded-[30px] border-[#dbdbdb6e] border"
                src={f.avatar ?? getFallbackAvatar(f.name ?? String(f.id))}
                alt={f.name}
              />
              <p className="text-center text-white font-Asap">{f.name}</p>
            </motion.li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
