import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Main_perfil_div from "../body/mainPerfilDiv";
import { getFriendshipState, getFriends, getMyFriendships } from "../functions/friendShip";

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
      select: {
        id: true,
        name: true,
        bio: true,
        avatar: true,
        background: true,
        image: true,
      },
    }),
  ]);

  if (!user) notFound();

  const friendship = await getFriendshipState(session?.user.id, user.id);
  const isOwner = friendship === "SELF";

  const { friends, received, sent } = isOwner
    ? await getMyFriendships(user.id)
    : { friends: await getFriends(user.id), received: [], sent: [] };

  return (
    <Main_perfil_div
      session={session}
      user={user}
      isOwner={isOwner}
      friendship={friendship}
      friends={friends}
      received={received}
      sent={sent}
    />
  );
}
