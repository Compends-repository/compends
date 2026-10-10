"use client";

import React from "react";
import { motion } from "motion/react";

import { useForm } from 'react-hook-form'

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

export default function FormLabels() {
  const [step, setStep] = React.useState(1);


  const { register, handleSubmit, trigger, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      birthDate: undefined,
      opt1: false,
      opt2: false,
    }
})

  function onSubmit(data) {
    console.log("Enviar", data)
  }

  async function handleNext() {
    const ok = await trigger([ 'userName', 'email', 'password', 'birthDate', 'op1', 'opt2' ])
    if (ok) setStep(2)
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }
  return (
    <div className="flex justify-center">
      <form
        className="flex min-h-[50vh] w-full max-w-sm flex-col gap-11 h-sm:gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 1 && <Step1 register={register} watch={watch} errors={errors}/>}

        {step === 2 && <Step2 control={control} watch={watch} errors={errors}/>}

        {step === 1 && (
          <button type="submit" onClick={handleNext} className="text-white">
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

        <p className="fixed 1xl:bottom-9 h-sm:bottom-1 2xl:bottom-9 left-20 text-[var(--chart-2)] font-bold font-saira pb-4 text-[15px] ">Etapa: {step}</p>
      </form>
    </div>
  );
}
