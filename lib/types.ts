import type { User } from "@/lib/generated/prisma/client";

export type PublicUser = Pick<
  User,
  "id" | "name" | "bio" | "avatar" | "background" | "image" | 'email'
>;