import { motion } from "motion/react";
import DOMPurify from "isomorphic-dompurify";

type userInfos = {
  name: string;
  bio: string;
};

export default function Text_info_user_list({
  name,
  bio,
}: userInfos) {

  

  return (
    <motion.div className="ml-[12%] h-xsm:ml-[9%] h-sm:ml-[9%] mt-[-9%] 2xl:ml-[11%] h-lg:ml-[9%] 3xl:ml-[11%] 2xl:mt-[-9%] h-lg:mt-[-7%] 3xl:mt-[-7%] text-white">
      <h1 className="text-[25px] font-semibold font-Asap backdrop-brightness-99 w-100 select-none">
        @{name}
      </h1>

      <div
        className="text-[#e6e6e6] w-98 text-[14.8px] backdrop-brightness-99 max-h-16 overflow-hidden ml-[0.4%] select-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(bio || ""),
        }}
      />
    </motion.div>
  );
}