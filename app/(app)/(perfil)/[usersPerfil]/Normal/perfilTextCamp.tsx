import type { auth } from "@/lib/auth";
import EditBio_OnPerfil, { EditName_OnPerfil } from "../Dialogs/EditBio";
import type { PublicUser } from "@/lib/types";

import { signatureToDataUri } from "@/lib/signature";

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
  const bio = user.bio || user.email || "";

  const signatureSrc = signatureToDataUri(user.signature);

  return (
    <div className="sticky z-40 text-white w-104 shrink-0 mb-[6.2%] ml-3 2xl:mb-[6%] 3xl:mb-[6%] h-sm:mb-[5%] bg-black/2 rounded-[15px]">
      {signatureSrc ? (
        <div className="flex items-center gap-3">
          <img
            src={signatureSrc}
            alt={user.name}
            className="h-15 w-auto max-w-none shrink-0 select-none pointer-events-none"
          />

          {/* nome + botão: o grupo só ocupa a largura do conteúdo */}
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 truncate text-[#b1b1b1a3] text-[21px] font-Asap font-black">
              @{user.name}
            </p>

            {isOwner && editorStarted && (
              <EditName_OnPerfil
                session={session}
                editorStarted={editorStarted}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="min-w-0 truncate text-[34px] 2xl:text-[30px] font-black font-Asap">
            @{user.name}
          </h1>

          {isOwner && editorStarted && (
            <EditName_OnPerfil
              session={session}
              editorStarted={editorStarted}
            />
          )}
        </div>
      )}

      <PopoverRoot
        animation="blur"
        className="h-18 items-start justify-start mt-[3%] ml-[3%] z-300"
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

        <PopoverContent className="mt-[-3.2%] ml-[-3%] backdrop-blur-3xl! backdrop-brightness-115! bg-[#3d3d3d]/85! w-[105%]!">
          <BioHtml
            html={bio}
            className="m-3 h-[calc(100%-1.5rem)] overflow-y-auto"
          />
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
