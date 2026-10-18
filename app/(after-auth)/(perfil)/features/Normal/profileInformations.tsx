import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Text_camps from "./perfilTextCamp.tsx";

export default function Main_perfil_image(props: any) {
  return (
    <>
      <div className="sticky 2xl:w-[200] 2xl:h-[200] 3xl:ml-[6%] sm:w-[180] sm:h-[180] md:ml-[10%] rounded-[42px] overflow-hidden flex shrink-0 mb-[3.5%] 2xl:ml-[8%] h-sm:mt-[5.5%] 2xl:mt-[3%] mt-[3%] 3xl:mt-[3%] border-[#dbdbdb6e] border-[1] shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] opacity-[0.9]">
        <img src={props.image} className="w-full h-full object-cover object-center" />
      </div>
      <Text_camps
        userName="Luninjag"
        userBio="Fundador da Compends, criada com o objetivo de unir pessoas e mundos..."
      />
    </>
  );
}
