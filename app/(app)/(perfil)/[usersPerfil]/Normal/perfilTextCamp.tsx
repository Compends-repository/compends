import type { auth } from "@/lib/auth";
import EditBio_OnPerfil from "../Dialogs/EditBio";
import type { PublicUser } from "@/lib/types";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
  user: PublicUser;
  isOwner: boolean;
  editorStarted: boolean;
};

export default function Text_camps({
  session,
  user,
  isOwner,
  editorStarted,
}: Props) {
  return (
    <div className="sticky text-white w-[26rem] shrink-0 mb-[6.2%] ml-3 2xl:mb-[6%] 3xl:mb-[8%] h-sm:mb-[5%] bg-black/2 rounded-[15px]">
      <h1 className="text-[34px] 2xl:text-[30px] font-black font-Asap truncate">
        @{user.name}
      </h1>

      <div className="mt-2 ml-[2%] max-w-[calc(100%-2rem)]">
        <div className="mt-2 ml-[2%] flex w-fit max-w-[calc(100%-1rem)] items-center gap-3">
          <p className="min-w-0 text-[14.8px] 2xl:text-[14px] leading-6 text-[#e6e6e6] text-pretty line-clamp-3">
            {user.bio ?? user.email}
          </p>

          {isOwner && editorStarted && (
            <EditBio_OnPerfil session={session} editorStarted={editorStarted} />
          )}
        </div>
      </div>
    </div>
  );
}
