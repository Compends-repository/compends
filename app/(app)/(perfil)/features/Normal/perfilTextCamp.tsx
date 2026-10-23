export default function Text_camps(props: any) {
  return (
    <div className="sticky text-white mb-[6.2%] ml-5 2xl:mb-[5.5%] 3xl:mb-[4.5%] h-sm:mb-[3%] bg-black/2 rounded-[15px]">
      <h1 className="text-[34px] font-black font-Asap">@{props.session?.user.name}</h1>
      <p className="ml-[1.9] mt-[2%] md:ml-[2%] w-85 text-[14.8px] text-[#e6e6e6] text-balance">
        {props.session?.user.bio}
      </p>
    </div>
  );
}
