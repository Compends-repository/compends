import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Text_camps from "./perfilTextCamp.tsx";

import { ImageUpload } from "@/app/components/image-upload.tsx";

import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

type Props = { session: Session | null };

export default function Main_perfil_image({ session }: Props) {
  return (
    <>
      <div className="sticky 2xl:w-[200] 2xl:h-[200] 3xl:ml-[21%] h-sm:ml-[17%] sm:w-[180] sm:h-[180] rounded-[42px] overflow-hidden flex shrink-0 mb-[3.5%] 2xl:ml-[17%] h-sm:mt-[5.5%] 2xl:mt-[3%] mt-[3%] 3xl:mt-[3%] border-[#dbdbdb6e] border-[1] shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] opacity-[0.9]">
        {session?.user.avatar ? (
          <img
            src={session?.user.avatar ?? undefined}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <ImageUpload labelIdle="Procurar imagens" />
        )}
      </div>
      <Text_camps session={session} />
    </>
  );
}
