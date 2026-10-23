import { auth } from "@/lib/auth";
import Main_perfil_div from "./(perfil)/features/mainPerfilDiv";
import { headers } from "next/headers";

export default async function authInfoOfUser() {

    const session = await auth.api.getSession({ headers: await headers() });

     return <Main_perfil_div session={session} />;
}