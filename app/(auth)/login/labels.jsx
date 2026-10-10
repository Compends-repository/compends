"use client";

import React from "react";
import { motion } from "motion/react";

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

export default function FormLabels() {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    userName: "",
    email: "",
    password: "",
    birthDate: undefined,
    opt1: false,
    opt2: false,
  });

  function onSubmit(data) {
    console.log(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (step === 1) {
      setStep(step + 1);
    } else {
      console.log("Enviar: ", form);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }
  return (
    <div className="flex justify-center">
      <form
        className="flex min-h-[70vh] w-full max-w-sm flex-col gap-11 h-sm:gap-7"
        onSubmit={handleSubmit}
      >
        {step === 1 && <Step1 form={form} setForm={setForm} />}

        {step === 2 && <Step2 form={form} setForm={setForm} />}

        {step === 1 && (
          <button type="submit" className="text-white">
            Próximo
          </button>
        )}

        {step > 1 && (
          <>
            <button type="button" onClick={handleBack} className="text-white">
              Voltar ao anterior
            </button>
            <button type="submit" className="text-white">
              Entrar
            </button>
          </>
        )}

        <p className="fixed 1xl:bottom-9 h-sm:bottom-1 2xl:bottom-9 left-20 text-[var(--chart-3)] font-bold pb-4 text-[15px]">Etapa: {step}</p>
      </form>
    </div>
  );
}
