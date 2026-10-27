import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Main_perfil_div from "./mainPerfilDiv";

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ usersPerfil: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  const { usersPerfil } = await params;

  const user = await db.user.findUnique({
    where: { id: usersPerfil },
    select: {
    id: true,
    name: true,
    email: true,
    bio: true,
    avatar: true,
    background: true,
    image: true,
  },
});
  if (!user) notFound();

  return <Main_perfil_div session={session} user={user} />;
}