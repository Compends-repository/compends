"use client";

import { useState } from "react";
import FormLabels from "./labels";

import LoginScreen from "./login/page.tsx";

export default function AuthPanelDecide() {
  const [mode, setMode] = useState<"signUp" | "login">("signUp");

  return (
    <div className="flex flex-col min-h-full">
      <h1 className="h-sm:text-3xl text-4xl pt-10 text-center text-white font-bold font-sigmar text-shadow-[2px_2px_4px_rgba(0,0,0,0.2)] 3xl:text-[40px] 3xl:pt-18">
        {mode === "signUp" ? "Welcome to Compends" : "Hey, you’re back!"}
        {/* [text-shadow:-2px_-2px_0_#1a1a2e,2px_-2px_0_#1a1a2e,-2px_2px_0_#1a1a2e,2px_2px_0_#1a1a2e,0_-2px_0_#1a1a2e,0_2px_0_#1a1a2e,-2px_0_0_#1a1a2e,2px_0_0_#1a1a2e] */}
      </h1>
      <h2 className="h-sm:text-xl text-2xl pt-1.5 text-center text-white font-semibold font-mitr">
        {mode === "signUp" ? "Start your journey" : "Log in to continue"}
      </h2>

      <div className="mt-22 h-sm:mt-14.2">
        {mode === "signUp" ? <FormLabels /> : <LoginScreen />}
      </div>

      <button
        onClick={() => setMode(mode === "signUp" ? "login" : "signUp")}
        className="mt-auto 3xl:py-6 h-sm:pr-37 h-sm:py-2 h-lg:pr-64 2xl:py-5 pr-47 3xl:pr-64 block w-full text-center text-[14.5px] bg-transparent text-white font-Asap cursor-pointer hover:underline"
      >
        {mode === "signUp"
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
