export default function Text_camps(props: any) {
  return (
    <div className="sticky text-white mb-[-2%] ml-5 2xl:mb-[-1.8%] 3xl:mb-[-1.8%] h-sm:mb-[-1.8%]">
      <h1 className="h-sm:text-[21px] h-lg:text-[23px] 3xl:text-[24px] 2xl:text-[22px] font-black font-Asap">
        @{props.userName}
      </h1>
      <p className="ml-[1.9] mt-[2%] md:ml-[2%] w-85 text-[12.8px] 2xl:text-[13.4px] 3xl:text-[14px] text-[#e6e6e6] text-balance">
        {props.userBio}
      </p>
    </div>
  );
}
