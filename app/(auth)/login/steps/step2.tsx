import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import React from "react";

import { Controller } from "react-hook-form";
import type { Control, FieldErrors, UseFormWatch } from "react-hook-form";

import type { FormValues } from "../labels";



type Step2Props = {
  control: Control<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
};

function calcularIdade(nascimento: Date) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const jaFezAniversario =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() >= nascimento.getDate());
  if (!jaFezAniversario) idade--;
  return idade;
}

export default function Step2({ control, watch, errors }: Step2Props) {
  const birthDate = watch("birthDate");
  const idade = birthDate ? calcularIdade(birthDate) : null;

  const hoje = new Date();
  const maxData = new Date(
    hoje.getFullYear() - 12,
    hoje.getMonth(),
    hoje.getDate(),
  );

  return (
    <>
      <Controller
        name="birthDate"
        control={control}
        rules={{
          required: "Informe sua data de nascimento",
          validate: (d) =>
            !d || d <= maxData || "Você precisa ter pelo menos 12 anos",
        }}
        render={({ field }) => (
          <Calendar
            className="rounded-lg border mt-[-10%] h-sm:mt-[-18%]"
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            captionLayout="dropdown"
          />
        )}
      />

      <p className="text-white ml-[67%] 2xl:ml-[71%] 2xl:text-[14px] mt-[-55%]">
        {birthDate ? birthDate?.toLocaleDateString() : "--/--/--"}
      </p>
      <p className="text-white ml-[61%] 2xl:ml-[66%] 2xl:text-[14px] mt-[-8%] font-saira flex flex-row">
        <strong>Você tem <span className="underline">{idade} anos</span></strong>
      </p>
      <FieldDescription className="h-sm:mt-[32%] mt-[20%] text-[#B9B9BD] ml-[2%]">
        Enter your real age.
      </FieldDescription>

      <Separator className="2xl:mt-[-3%]" />

      <Controller
        name="opt1"
        control={control}
        render={({ field }) => (
          <label className="2xl:mt-[1%] 3xl:mt-[8%] flex items-start gap-2 select-none 2xl:text-[14px] 3xl:text-[16px] font-medium text-white cursor-pointer font-mitr">
            <Checkbox
              checked={field.value}
              required
              onCheckedChange={field.onChange}
              className="w-4 h-4 focus:ring-0 focus:outline-none"
            />
            Declaro que as informações fornecidas, incluindo minha data de
            nascimento, são verdadeiras.
          </label>
        )}
      />

      <Controller
        name="opt2"
        control={control}
        render={({ field }) => (
          <label className="flex items-center gap-2 select-none 2xl:text-[14px] 3xl:text-[16px] font-medium text-white cursor-pointer font-mitr">
            <Checkbox
              checked={field.value}
              required
              onCheckedChange={field.onChange}
              className="w-4 h-4 focus:ring-0 focus:outline-none"
            />
            Accept the terms of Compends
          </label>
        )}
      />
    </>
  );
}
