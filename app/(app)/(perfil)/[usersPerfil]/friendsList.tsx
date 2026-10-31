import { auth } from "@/lib/auth";
import { FriendPreview } from "@/lib/types";
import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/gaze.json" with { type: "json" };
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
    return new Avatar(style, { seed, size: 120, backgroundColor: ["ffb703"] }).toDataUri();
  }
  //
  return (
    <div className="mt-[12%] flex ">
      <ul className="flex flex-nowrap gap-12 overflow-x-auto ml-[5%]">
        {friends.map((f) => (
          <Link key={f.id} href={`/${f.id}`}>
            <li>
              <img className="w-40 h-40"
                src={f.avatar ?? getFallbackAvatar(f.name ?? String(f.id))}
                alt={f.name}
              />
              <p className="text-center text-white">{f.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
