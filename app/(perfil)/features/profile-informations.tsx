import Text_camps from "./perfil-text-camp.tsx";

export default function Main_perfil_image(props: any) {
  return (
    <>
      <div className="2xl:w-[220] 2xl:h-[220] 3xl:ml-[6vw] md:ml-[10vw] rounded-[42px] overflow-hidden flex shrink-0 mb-[6vh] 2xl:ml-[8vw] sm:w-[200] sm:h-[200]">
        <img
          src={props.image}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <Text_camps userName="Luninjag" userBio="Fundador da Compends, criada pela Tera E. com o objetivo de unir pessoas e mundos." />
    </>
  );
}
