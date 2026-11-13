import DOMPurify from "isomorphic-dompurify";
import { propagateSubtreeBits } from "next/dist/shared/lib/app-router-types";

import type { auth } from "@/lib/auth";
type Session = typeof auth.$Infer.Session;
import type { PublicUser } from "@/lib/types";

type Props = {
  session: Session | null;
  user: PublicUser;
};

export default function Text_camps({ session, user }: Props) {

   const signatureSrc = user.signature
    ? `data:image/svg+xml;utf8,${encodeURIComponent(user.signature)}`
    : null;

  return (
    <div className="sticky text-white mb-[-2%] ml-5 2xl:mb-[-1.8%] 3xl:mb-[-1.8%] h-sm:mb-[-1.8%]">
      {signatureSrc ? (
        <>
          <div className="flex items-center gap-3">
            <img
              src={signatureSrc}
              alt={user.name}
              className="h-15 w-auto max-w-none shrink-0 select-none pointer-events-none"
            />
            <p className="truncate text-[#b1b1b1a3] text-[21px] font-Asap font-black">@{user.name}</p>
          </div>
        </>
      ) : (
        <h1 className="h-sm:text-[21px] h-lg:text-[23px] 3xl:text-[24px] 2xl:text-[22px] font-black font-Asap">
          @{user.name}
        </h1>
      )}
      <div
          className="ml-[1.9] mt-[2%] md:ml-[2%] max-w-md text-[12.8px] text-pretty 2xl:text-[13.4px] 3xl:text-[14px] text-[#e6e6e6] line-clamp-2 select-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(user.bio || ""),
        }}
      />
    </div>
  );
}
