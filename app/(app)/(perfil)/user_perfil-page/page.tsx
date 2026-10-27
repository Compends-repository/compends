import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Main_perfil_div from "../[usersPerfil]/mainPerfilDiv";

export default async function PerfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  redirect(`/${session.user.id}`)
}