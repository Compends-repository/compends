import Text_camps from "./Reduced_perfilTextCamp.tsx";

export default function Main_perfil_image(props: any) {
  return (
    <>
      <div className="sticky 2xl:w-[120] 2xl:h-[120] h-lg:w-[130] h-lg:h-[130] 3xl:w-[130] 3xl:h-[130] 3xl:ml-[3%] md:ml-[5%] rounded-[32px] overflow-hidden flex shrink-0 mb-[-3%] 2xl:ml-[5%] sm:w-[120] sm:h-[120] border-[#dbdbdb6e] border-[1] shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] opacity-[0.9]">
        <img src={props.image} className="w-full h-full object-cover object-center" />
      </div>
      <Text_camps
        session={props.session}
        userName={props.session?.user.name}
        userBio={props.session?.user.bio ?? props.session?.user.email}
      />
    </>
  );
}
