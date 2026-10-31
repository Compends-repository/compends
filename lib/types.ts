import type { User } from "@/lib/generated/prisma/client";

export type PublicUser = Pick<
  User,
  "id" | "name" | "bio" | "avatar" | "background" | "image"
> & { email?: string };

export type FriendshipState =
  | "SELF"
  | "NONE"
  | "FRIENDS"
  | "REQUEST_SENT"
  | "REQUEST_RECEIVED";

export type FriendPreview = Pick<User, "id" | "name" | "avatar" | "image">;