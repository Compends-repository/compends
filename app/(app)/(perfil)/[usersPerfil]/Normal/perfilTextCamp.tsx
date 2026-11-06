import type { auth } from "@/lib/auth";
import EditBio_OnPerfil from "../Dialogs/EditBio";
import type { PublicUser } from "@/lib/types";

import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

import DOMPurify from "isomorphic-dompurify";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
  user: PublicUser;
  isOwner: boolean;
  editorStarted: boolean;
};

// 1) BioHtml: fora do componente principal
function BioHtml({
  html,
  clamp = false,
  className = "",
}: {
  html: string;
  clamp?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`bio-html min-w-0 text-[14.8px] 2xl:text-[14px] leading-6 text-[#e6e6e6] text-pretty select-none [overflow-wrap:anywhere] ${
        clamp ? "max-h-[4.5rem] overflow-hidden" : ""
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}

export default function Text_camps({
  session,
  user,
  isOwner,
  editorStarted,
}: Props) {
  // 2) bio: dentro do componente, antes do return
  const bio = user.bio || user.email || "";

  return (
    <div className="sticky text-white w-[26rem] shrink-0 mb-[6.2%] ml-3 2xl:mb-[6%] 3xl:mb-[8%] h-sm:mb-[5%] bg-black/2 rounded-[15px]">
      <h1 className="text-[34px] 2xl:text-[30px] font-black font-Asap truncate">
        @{user.name}
      </h1>

      <PopoverRoot
        animation="blur"
        className="h-[4.5rem] items-start justify-start mt-[4%] ml-[0.8%]"
      >
        <PopoverTrigger className="bg-transparent! border-none! w-full h-auto! items-start! justify-start px-0! text-left!">
          <div className="flex w-full items-start gap-3 text-left">
            <BioHtml html={bio} clamp className="flex-1" />

            {isOwner && editorStarted && (
              <EditBio_OnPerfil
                session={session}
                editorStarted={editorStarted}
              />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="mt-0 ml-0 backdrop-blur-3xl bg-transparent! backdrop-brightness-115!">
          <BioHtml
            html={bio}
            className="m-3 h-[calc(100%-1.5rem)] overflow-y-auto"
          />
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
