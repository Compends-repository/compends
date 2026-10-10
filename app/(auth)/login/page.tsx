"use client";
import Image from "next/image";
import { AnimatePresence, color, motion, scale } from "motion/react";

import FormLabels from "./labels";
import { style } from "motion/react-client";
import { useState } from "react";

import GamePresentation from "./boards";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden no-scrollbar">

      <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fixed brightness-70 [image-rendering:pixelated]" 
      style={{ backgroundImage: "url('/CapsuleDraft.webp')" }}
      />
      
      <div className="flex h-dvh p-5">

        <div className="absolute shrink-0 self-start overflow-hidden h-sm:w-[540] 2xl:w-[630] 3xl:w-[720] aspect-3/1 mr-auto">

          <img
            className="w-full h-auto -translate-y-[20%] -translate-x-[22%]"
            src="/logo1.svg"
            alt="Compends logo"
          />
        </div>

        <GamePresentation />

        <div className="ml-auto h-full w-full h-sm:w-[520] 2xl:w-[560] 3xl:w-[630] overflow-y-auto bg-[#0000003e] border border-[#ffffff42] rounded-[40px] shadow-[0px_0px_7px_3px_rgba(0,0,0,0.203)] backdrop-blur-sm no-scrollbar">
          
          <h1 className="h-sm:text-3xl text-4xl pt-10 text-center text-white font-bold font-sigmar text-shadow-[2px_2px_4px_rgba(0,0,0,0.2)] 3xl:text-[40px] 3xl:pt-18">
            Welcome to Compends
            {/* [text-shadow:-2px_-2px_0_#1a1a2e,2px_-2px_0_#1a1a2e,-2px_2px_0_#1a1a2e,2px_2px_0_#1a1a2e,0_-2px_0_#1a1a2e,0_2px_0_#1a1a2e,-2px_0_0_#1a1a2e,2px_0_0_#1a1a2e] */}
          </h1>
          <h2 className="h-sm:text-xl text-2xl pt-1.5 text-center text-white font-semibold font-mitr">
            Start your journey
          </h2>

          <div className="mt-22 h-sm:mt-14.2">
            <FormLabels />
          </div>
        </div>
      </div>
    </main>
  );
}
