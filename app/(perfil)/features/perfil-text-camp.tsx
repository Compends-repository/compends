export default function Text_camps(props: any) {
  return (
    <div className="text-white font-kanit mb-[7.2vh] ml-5 2xl:mb-[16vh] h-sm:mb-[18vh]">
      <h1 className="text-[32px] font-semibold">@{props.userName}</h1>
      <p className="ml-[1.9] mt-[2%] md:ml-[2%] w-85">{props.userBio}</p>
    </div>
  );
}
