import { AnimatePresence, motion } from "motion/react";
import Main_perfil_div from "../features/mainPerfilDiv.tsx";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Session = typeof auth.$Infer.Session;


export default async function perfilPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return <Main_perfil_div session={session} />;
}