"use server";
import Image from "next/image";
import GamePresentation from "./boards";
import FormLabels from "./labels";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AuthPanelDecide from "./authPanel";

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/user_perfil-page");

  return (
    <main className="relative min-h-screen overflow-hidden no-scrollbar">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fixed brightness-70 [image-rendering:pixelated]"
        style={{ backgroundImage: "url('/CapsuleDraft.webp')" }}
      />

      <div className="flex h-dvh p-5">
        <div className="absolute shrink-0 self-start overflow-hidden h-sm:w-[540] 2xl:w-[630] 3xl:w-[720] aspect-3/1 mr-auto">
          <img
            className="w-full h-auto translate-y-[-20%] translate-x-[-22%]"
            src="/logo/logo1.svg"
            alt="Compends logo"
          />
        </div>

        <GamePresentation />

        <div className="ml-auto h-full w-full h-sm:w-[520] 2xl:w-[560] 3xl:w-[630] overflow-y-auto bg-[#0000003e] border border-[#ffffff42] rounded-[40px] shadow-[0px_0px_7px_3px_rgba(0,0,0,0.203)] backdrop-blur-sm no-scrollbar">
          <AuthPanelDecide />
        </div>
      </div>
    </main>
  );
}
