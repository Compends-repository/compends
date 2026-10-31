import "server-only";
import { db } from "@/lib/db";
import type { FriendshipState } from "@/lib/types";

const publicUser = {
  id: true,
  name: true,
  avatar: true,
  image: true,
} as const;

export async function getFriendshipState(
  viewerId: string | undefined,
  profileId: string
): Promise<FriendshipState> {
  if (!viewerId) return "NONE";
  if (viewerId === profileId) return "SELF";

  const f = await db.friendship.findFirst({
    where: {
      OR: [
        { requesterId: viewerId, addresseeId: profileId },
        { requesterId: profileId, addresseeId: viewerId },
      ],
    },
  });

  if (!f || f.status === "BLOCKED") return "NONE";
  if (f.status === "ACCEPTED") return "FRIENDS";
  return f.requesterId === viewerId ? "REQUEST_SENT" : "REQUEST_RECEIVED";
}

export async function getFriends(userId: string) {
  const friendships = await db.friendship.findMany({
    where: {
      status: "ACCEPTED",
      OR: [{ requesterId: userId }, { addresseeId: userId }],
    },
    select: {
      requesterId: true,
      requester: { select: publicUser },
      addressee: { select: publicUser },
    },
  });

  return friendships.map((f) =>
    f.requesterId === userId ? f.addressee : f.requester
  );
}