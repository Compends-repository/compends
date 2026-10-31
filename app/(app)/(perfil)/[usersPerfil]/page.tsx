import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Main_perfil_div from "./mainPerfilDiv";
import { getFriendshipState, getFriends } from "./friendShip";


export default async function PerfilPage({
  params,
}: {
  params: Promise<{ usersPerfil: string }>;
}) {
  const { usersPerfil } = await params;

  const [session, user] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    db.user.findUnique({
      where: { id: usersPerfil },
      select: { id: true, name: true, bio: true, avatar: true, background: true, image: true },
    }),
  ]);

  if (!user) notFound();

const [friendship, friends] = await Promise.all([
  getFriendshipState(session?.user.id, user.id),
  getFriends(user.id),
]);

return (
  <Main_perfil_div
    session={session}
    user={user}
    isOwner={friendship === "SELF"}
    friendship={friendship}
    friends={friends}
  />
);
}