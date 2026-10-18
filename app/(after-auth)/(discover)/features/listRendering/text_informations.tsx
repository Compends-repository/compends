import { motion } from 'motion/react'

type userInfos = {
  name: string;
  bio: string;
};

export default function Text_info_user_list({ name, bio }: userInfos) {
  return (
    <motion.div className="2xl:ml-[15%] h-lg:ml-[12%] 3xl:ml-[12%] 2xl:mt-[-12%] h-lg:mt-[-10%] 3xl:mt-[-10%] text-white ">
      <h1 className="text-[30px] font-semibold font-roboto backdrop-brightness-99 w-100 rounded-t-[15px]">@{name}</h1>
      <p className="text-[#e6e6e6] absolute text-balance w-98 text-[14.8px] backdrop-brightness-99 rounded-b-[15px] ml-[0.4%]">{bio}</p>
    </motion.div>
  );
}
