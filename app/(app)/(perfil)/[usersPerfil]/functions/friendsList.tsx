import { auth } from "@/lib/auth";
import { FriendPreview } from "@/lib/types";
import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };
import definition3 from '@dicebear/styles/marbles.json' with { type: 'json' };
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
  const style = new Style(definition3);

  function getFallbackAvatar(seed: string) {
    return new Avatar(style, {
      seed,
      size: 120,
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
  //
  return (
    <>
      <h2 className="absolute text-white mt-[7%] ml-[5%] 2xl:text-[30px] 3xl:text-[36px] font-Changa bg-[#00000000] rounded-lg">
        Friends -{" "}
        <span className="font-normal font-josefin">{friends.length}</span>
      </h2>
      <div className="mt-[10%] flex">
        {friends.length !== 0 ? (
          <ul className="flex flex-nowrap gap-6 overflow-x-auto ml-[5%] 2xl:h-50 3xl:h-55 w-[190vh]">
            {friends.map((f) => (
              <Link key={f.id} href={`/${f.id}`}>
                <motion.li whileHover={{ scale: 1.08 }} className="mt-4 ml-4">
                  <div className="relative isolate mb-3 aspect-square shrink-0 w-28 2xl:w-35 3xl:w-38 rounded-[31px] 2xl:rounded-[35px] 3xl:rounded-[39px] select-none">

                    {/* forma */}
                    <div className="relative isolate flex h-full w-full overflow-hidden rounded-[25px] 2xl:rounded-[34px] 3xl:rounded-[38px] border border-[#dbdbdb6e] shadow-[0_1.5px_4.5px_rgba(0,0,0,0.2)]">
                      <img
                        src={
                          f.avatar ?? getFallbackAvatar(f.name ?? String(f.id))
                        }
                        alt={f.name}
                        className="h-full w-full object-cover object-center select-none"
                      />

                      {/* brilho */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[25px] 2xl:rounded-[34px] 3xl:rounded-[38px] bg-gradient-to-br from-white/25 via-transparent to-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                      />
                    </div>
                  </div>

                  <p className="text-center text-white font-Asap font-bold">
                    @{f.name}
                  </p>
                </motion.li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="ml-[6%] mt-[1.5%] text-[#ffffffb6] bg-[#091b46] py-1 px-2 border border-[#fdfdfd7a]">
            No friends added yet <span className="ml-1">:(</span>
          </p>
        )}
      </div>
    </>
  );
}
