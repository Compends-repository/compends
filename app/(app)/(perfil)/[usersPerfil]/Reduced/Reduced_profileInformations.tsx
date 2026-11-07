import { Avatar, Style } from "@dicebear/core";
import Text_camps from "./Reduced_perfilTextCamp.tsx";

import definition from "@dicebear/styles/gaze.json" with { type: "json" };
import definition2 from "@dicebear/styles/lorelei.json" with { type: "json" };

export default function Main_perfil_image(props: any) {
  const style = new Style(definition2);
  const avatar = new Avatar(style, {
    backgroundColor: [
      "43aa8b",
      "4d96ff",
      "b57bff",
      "ff8c42",
      "2ec4b6",
      "f15bb5",
      "f55151",
    ],
    skinColor: ["fffdfb"],
    hairColor: [
      "1b1b3a",
      "d90429",
      "0466c8",
      "007f5f",
      "7b2cbf",
      "f77f00",
      "006d77",
      "9d0208",
    ],
    eyebrowsColor: ["1b1b3a"],
    eyesColor: ["1b1b3a"],
    noseColor: ["1b1b3a"],
    mouthColor: ["1b1b3a"],
    frecklesColor: ["1b1b3a"],
    glassesColor: ["1b1b3a"],
    earringsColor: ["1b1b3a"],
    hairAccessoriesColor: ["1b1b3a"],
    seed: props.user.name ?? props.user.id,
    size: 200,
  });
  const fallbackAvatar = avatar.toDataUri();

  return (
    <>
      <div className="sticky 2xl:w-[120] 2xl:h-[120] h-lg:w-[130] h-lg:h-[130] 3xl:w-[130] 3xl:h-[130] 3xl:ml-[3%] md:ml-[5%] rounded-[32px] overflow-hidden flex shrink-0 mb-[-3%] 2xl:ml-[5%] sm:w-[120] sm:h-[120] border-[#dbdbdb6e] border-[1] shadow-[3px_6px_15px_0px_rgba(0,0,0,0.24)] opacity-[0.9] select-none">
        <img
          src={props.user.avatar ?? fallbackAvatar}
          className="w-full h-full object-cover object-center select-none"
        />
      </div>
      <Text_camps
        session={props.session}
        userName={props.user.name}
        userBio={props.user.bio ?? props.user.email}
      />
    </>
  );
}
