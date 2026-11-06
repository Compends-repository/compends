import "server-only";
import { db } from "@/lib/db";
import type { FriendshipState, FriendPreview } from "@/lib/types";

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

export async function getMyFriendships(userId: string) {
  const rows = await db.friendship.findMany({
    where: {
      OR: [{ requesterId: userId }, { addresseeId: userId }],
      status: { not: "BLOCKED" },
    },
    select: {
      requesterId: true,
      status: true,
      requester: { select: publicUser },
      addressee: { select: publicUser },
    },
    orderBy: { createdAt: "desc" },
  });

  const friends: FriendPreview[] = [];
  const received: FriendPreview[] = [];
  const sent: FriendPreview[] = [];

  for (const r of rows) {
    const iAmRequester = r.requesterId === userId;
    const other = iAmRequester ? r.addressee : r.requester;

    if (r.status === "ACCEPTED") friends.push(other);
    else if (iAmRequester) sent.push(other);
    else received.push(other);
  }

  return { friends, received, sent };
}