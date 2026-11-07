import Text_camps from "./perfilTextCamp.tsx";

import { Avatar, Style } from "@dicebear/core";

import { ImageUpload } from "@/app/components/image-upload.tsx";

import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };

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
  const style = new Style(definition2);

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
    skinColor: ["fffdfb"],
    hairColor: [
      "1b1b3a",
      "d90429",
      "0466c8",
      "007f5f",
      "7b2cbf",
      "f77f00",
      "006d77",
      "9d0208",
    ],
    eyebrowsColor: ["1b1b3a"],
    eyesColor: ["1b1b3a"],
    noseColor: ["1b1b3a"],
    mouthColor: ["1b1b3a"],
    frecklesColor: ["1b1b3a"],
    glassesColor: ["1b1b3a"],
    earringsColor: ["1b1b3a"],
    hairAccessoriesColor: ["1b1b3a"],
  });

  const fallbackAvatar = avatar.toDataUri();

  return (
    <>
      <div className="avatar-upload sticky 2xl:w-[200px] 2xl:h-[200px] 3xl:ml-[21%] h-sm:ml-[17%] sm:w-[180px] sm:h-[180px] rounded-[48px] overflow-hidden flex shrink-0 mb-[3.5%] 2xl:ml-[17%] h-sm:mt-[5.5%] 2xl:mt-[3%] mt-[3%] 3xl:mt-[3%] border-[#dbdbdb6e] border shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] opacity-[0.9] select-none">
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
            src={user.avatar ?? fallbackAvatar}
            alt={user.name}
            className="w-full h-full object-cover object-center select-none"
          />
        )}
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
