import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DropdownMenuPerfil() {
  const router = useRouter();
  function onHandleClick() {
    router.push("/login");
  }
  return (
    <div className="fixed z-50 top-[110.7%] right-[0%] min-h-[155] w-[203] flex p-4 backdrop-blur-3xl backdrop-contrast-125 backdrop-brightness-95 backdrop-opacity-65 bg-black/20 rounded-[20px] text-white border border-[#cccdc76d] border-b">
      <nav>
        <motion.button
          onClick={onHandleClick}
          className="cursor-pointer hover:text-red-500 hover:translate-y-[-2px] shrink-0 hover:font-bold"
        >
          Log out
        </motion.button>
      </nav>
    </div>
  );
}
