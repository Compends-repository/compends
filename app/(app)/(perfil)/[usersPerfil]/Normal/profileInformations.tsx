import Text_camps from "./perfilTextCamp.tsx";

import { Avatar, Style } from "@dicebear/core";

import { ImageUpload } from "@/app/components/image-upload.tsx";

import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };
import definition3 from '@dicebear/styles/marbles.json' with { type: 'json' };

import type { auth } from "@/lib/auth";
import type { PublicUser } from "@/lib/types";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
  user: PublicUser;
  isOwner: boolean;
  editorStarted: boolean;
};

export default function Main_perfil_image({
  session,
  user,
  isOwner,
  editorStarted,
}: Props) {
  const style = new Style(definition3);

  const avatar = new Avatar(style, {
    seed: user.name ?? user.id,
    size: 200,
    backgroundColor: [
      "43aa8b",
      "4d96ff",
      "b57bff",
      "ff8c42",
      "2ec4b6",
      "f15bb5",
      "f55151",
    ],
  });

  const fallbackAvatar = avatar.toDataUri();
  const avatarSrc = user.avatar ?? fallbackAvatar;

  return (
    <>
      <div className="avatar-upload sticky rounded-[48px] 2xl:w-[200px] 2xl:h-[200px] 3xl:ml-[21%] h-sm:ml-[17%] sm:w-[180px] sm:h-[180px] shrink-0 mb-[3.5%] 2xl:ml-[17%] h-sm:mt-[5.5%] 2xl:mt-[3%] mt-[3%] 3xl:mt-[3%] select-none">
        
        <div
          aria-hidden
          className="absolute inset-x-[8%] top-[14%] -bottom-[6%] -z-10 rounded-[47px] bg-cover bg-center blur-2xl saturate-[1.8] opacity-70 translate-y-3"
          style={{ backgroundImage: `url(${JSON.stringify(avatarSrc)})` }}
        />

        <div className="relative isolate flex h-full w-full overflow-hidden rounded-[47px] border border-[#dbdbdb6e] shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
          {isOwner && editorStarted ? (
            <ImageUpload
              key={`avatar-${user.id ?? user.avatar ?? null}`}
              labelIdle="Procurar imagens"
              field="avatar"
              initialUrl={user.avatar || null}
              alt={user.name}
            />
          ) : (
            <img
              src={avatarSrc}
              alt={user.name}
              className="h-full w-full object-cover object-center select-none"
            />
          )}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[45px] bg-gradient-to-br from-white/25 via-transparent to-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
          />
        </div>
      </div>

      <Text_camps
        session={session}
        user={user}
        isOwner={isOwner}
        editorStarted={editorStarted}
      />
    </>
  );
}
