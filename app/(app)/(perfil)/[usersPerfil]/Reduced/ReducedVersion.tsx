import { IconArrowAutofitDown } from "@tabler/icons-react";
import { motion } from "motion/react";
import Add_friend_button from "./Reduced_addFriendButton.tsx";
import Main_perfil_image from "./Reduced_profileInformations.tsx";
import { auth } from "@/lib/auth.ts";
import { PublicUser } from "@/lib/types.ts";

type Session = typeof auth.$Infer.Session;


type Props = { onToggle: () => void; session: Session | null; user: PublicUser };


export default function ReducedPerfilDivVersion({ onToggle, session, user }: Props) {
  return (
    <div className="w-full h-[270] 3xl:h-[270] 2xl:h-[240] flex items-center sticky top-0 z-10 backdrop-blur-[3px] backdrop-brightness-95 bg-black/10 border-b rounded-b-[45px] border-[#ececec63] no-scrollbar shadow-[3px_6px_15px_0px_rgba(0,0,0,0.38)] contrast-125">
      <Main_perfil_image image={session?.user.avatar} session={session} user={user}/>
      <motion.button
        onClick={onToggle}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        whileHover={{ scale: 1.13 }}
      >
        <IconArrowAutofitDown className="w-[30] h-[30]" />
      </motion.button>
    </div>
  );
}
