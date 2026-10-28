import Text_camps from "./perfilTextCamp.tsx";

import { Avatar, Style } from "@dicebear/core";

import { ImageUpload } from "@/app/components/image-upload.tsx";

import definition from '@dicebear/styles/gaze.json' with { type: 'json' };

import type { auth } from "@/lib/auth";
import type { PublicUser } from "@/lib/types";



type Session = typeof auth.$Infer.Session;

type Props = { session: Session | null; user: PublicUser; isOwner: boolean };

export default function Main_perfil_image({ session, user, isOwner }: Props) {

  const style = new Style(definition);

  const avatar = new Avatar(style, {
    seed: user.name ?? user.id ?? "usuario-padrao",
    size: 200,
  })

  const fallbackAvatar = avatar.toDataUri()

  return (
    <>
      <div className="avatar-upload sticky 2xl:w-[200px] 2xl:h-[200px] 3xl:ml-[21%] h-sm:ml-[17%] sm:w-[180px] sm:h-[180px] rounded-[48px] overflow-hidden flex shrink-0 mb-[3.5%] 2xl:ml-[17%] h-sm:mt-[5.5%] 2xl:mt-[3%] mt-[3%] 3xl:mt-[3%] border-[#dbdbdb6e] border-[1] shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] opacity-[0.9]">
        {isOwner ? (
          <ImageUpload
            key={`avatar-${user.id ?? user.avatar ?? 'sem-avatar'}`}
            labelIdle="Procurar imagens"
            field="avatar"
            initialUrl={session?.user.avatar || fallbackAvatar}
            alt={user.name}
          />
        ) : (
          <img
            src={user.avatar ?? fallbackAvatar}
            alt={user.name}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>
      <Text_camps session={session} user={user} isOwner={isOwner} />
    </>
  );
}
