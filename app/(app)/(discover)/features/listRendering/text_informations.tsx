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
    <motion.div className="2xl:ml-[11%] h-lg:ml-[9%] 3xl:ml-[12%] 2xl:mt-[-9%] h-lg:mt-[-7%] 3xl:mt-[-6%] text-white">
      <h1 className="text-[25px] font-semibold font-Asap backdrop-brightness-99 w-100">
        @{name}
      </h1>

      <div
        className="text-[#e6e6e6] w-98 text-[14.8px] backdrop-brightness-99 max-h-16 overflow-hidden ml-[0.4%]"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(bio || ""),
        }}
      />
    </motion.div>
  );
}