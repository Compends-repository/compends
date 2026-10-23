'use client'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import LogoOfTheGame from "./gameLogo";

export default function GamePresentation() {
  const imageVariants: Variants = {
    hidden: { scale: 1 },
    show: { scale: 1 },
    hover: { scale: 1.065, transition: { duration: 0.15, ease: "easeOut" } },
  };

  const cardVariants: Variants = {
    rest: {},
    hover: {
      scale: 1.03,
      zIndex: 50,
      cursor: "pointer",
      translateY: "-8px",
      borderColor: "rgba(255,255,255,0.9)",
      transition: {
        type: "spring",
        stiffness: 360,
        damping: 22,
        duration: 0.05,
      },
    },
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col items-center pb-1 justify-end">
      <LogoOfTheGame />
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        className="z-30 w-[33%] 2xl:w-[37%] 3xl:w-[33%] rounded-[2cqw] border-2 border-transparent overflow-hidden shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.4)]"
      >
        <motion.img
          variants={imageVariants}
          className="aspect-[5/3] w-full rounded-[2cqw] object-cover"
          src="https://cdn.phototourl.com/member/2026-10-03-bebfc521-ec84-49a7-bdbc-aa35b911c749.png"
          alt="Preview image top of the game"
        />
      </motion.div>

      <div className="2xl:shrink-0 z-20 -mt-[15%] 2xl:-mt-[19%] 3xl:-mt-[17%] flex w-[70%] items-end justify-center">
        <motion.div
          variants={cardVariants}
          className="2xl:shrink-0 z-10 w-[42%] 2xl:w-[47%] 3xl:w-[42%] rotate-[-1deg] rounded-[2cqw] border-2 border-transparent overflow-hidden shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.4)]"
          style={{ zIndex: 10 }}
          whileHover="hover"
        >
          <motion.img
            variants={imageVariants}
            className="aspect-[17/11] w-full rounded-[2cqw] object-cover rounded-[2cqw]"
            src="https://cdn.discordapp.com/attachments/1539756471246393374/1540049459314958436/ProjectEncoreIcon.png?ex=6ac13ad3&is=6abfe953&hm=658f0885c941a07de6c98a0b78080fb0ff69cb9c5eb864e1510088603c2ddace"
            alt=""
          />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="2xl:shrink-0 z-10 ml-[20%] w-[42%] 2xl:w-[47%] 3xl:w-[42%] rotate-[1deg] rounded-[2cqw] border-2 border-transparent overflow-hidden shadow-[2px_2px_4px_2px_rgba(0,0,0,0.4)]"
          whileHover="hover"
        >
          <motion.img
            variants={imageVariants}
            className="aspect-[17/11] w-full rounded-[2cqw] object-cover"
            src="https://cdn.discordapp.com/attachments/1537635103268675585/1537635105357434961/NONBELIEF.png?ex=6ac25588&is=6ac10408&hm=7a383656a7135c5b419af1c8dcf6188d0076c9f83a51066ebdadae3b4cbb48a5&"
            alt=""
          />
        </motion.div>
      </div>

      <div className="2xl:shrink-0 z-10 -mt-[15%] 2xl:-mt-[18%] 3xl:-mt-[16%] flex w-[90%] items-end justify-center">
        <motion.div
          variants={cardVariants}
          className="2xl:shrink-0 3xl:shrink z-10 w-[41%] 2xl:w-[34%] 3xl:w-[42%] rounded-[2cqw] border-2 border-transparent overflow-hidden shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.4)]"
          whileHover="hover"
        >
          <motion.img
            variants={imageVariants}
            className="aspect-[17/11] w-full rounded-[2cqw] object-cover"
            src="https://i.kickstarter.com/assets/054/802/594/594904620ceb6254ded930402419cce6_original.png?anim=false&fit=cover&gravity=auto&height=576&origin=ugc&q=92&v=1787077835&width=1024&sig=7qeTQfR4PSoSKMxX7YA5Nj2Aqm2NfPmdEeuHoPfnf40%3D"
            alt=""
          />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="2xl:shrink-0 3xl:shrink z-10 2xl:w-[34%] ml-[40%] w-[41%] 3xl:w-[42%] rounded-[2cqw] border-2 border-transparent overflow-hidden shadow-[2px_2px_4px_2px_rgba(0,0,0,0.4)]"
          whileHover="hover"
        >
          <motion.img
            variants={imageVariants}
            className="aspect-[17/11] w-full rounded-[2cqw] object-cover"
            src="https://cdn.discordapp.com/attachments/1538202003581444096/1538202004210585760/scene-1.png?ex=6ac119c0&is=6abfc840&hm=54f5e1918b71780dcf3aa2117a588a3e6a063fd0b96638eea2414dc65a629f1d"
            alt=""
          />
        </motion.div>
      </div>
    </section>
  );
}
