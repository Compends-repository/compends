import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator"
import React from "react";

type FormData = {
  userName: string;
  email: string;
  password: string;
  birthDate: Date | undefined;
  opt1: boolean;
  opt2: boolean;
};

type Step2Props = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
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

export default function Step2({ form, setForm }: Step2Props) {
  const date = form.birthDate;
  const idade = date ? calcularIdade(date) : null;
  const hoje = new Date()
  const maxData = new Date(hoje.getFullYear() - 12, hoje.getMonth(), hoje.getDate())

  return (
    <>
      <p className="text-white ml-[67%] 2xl:ml-[71%] 2xl:text-[14px] mt-[15%]">
        {date?.toLocaleDateString("en-US")}
      </p>
      <p className="text-white ml-[61%] 2xl:ml-[66%] 2xl:text-[14px] mt-[-8%]">
        <strong>Você tem {idade} anos</strong>
      </p>
      <Calendar
        mode="single"
        selected={date}
        required
        onSelect={(d) => setForm((f) => ({ ...f, birthDate: d }))}
        className="rounded-lg border mt-[-45%] 2xl:mt-[-45%]"
        captionLayout="dropdown"
        startMonth={new Date(1920, 0)}
        defaultMonth={date ?? new Date(hoje.getFullYear() - 18, 0)}
        disabled={{after: maxData}}
        endMonth={maxData}
      />
      <FieldDescription className="mt-[-10%] text-[#B9B9BD] ml-[2%]">
        Enter your real age.
      </FieldDescription>

      <Separator className='2xl:mt-[-3%]'/>

      <label className="2xl:mt-[1%] 3xl:mt-[8%] flex items-start gap-2 select-none 2xl:text-[14px] 3xl:text-[16px] font-medium text-white cursor-pointer font-mitr">
        <Checkbox
          checked={form.opt1}
          onCheckedChange={(c) => setForm((f) => ({ ...f, opt1: c === true }))}
          className="w-4 h-4 focus:ring-0 focus:outline-none"
        />
        Declaro que as informações fornecidas, incluindo minha data de nascimento, são verdadeiras.
      </label>

      <label className="flex items-center gap-2 select-none 2xl:text-[14px] 3xl:text-[16px] font-medium text-white cursor-pointer font-mitr">
        <Checkbox
        checked={form.opt2}
          onCheckedChange={(c) => setForm((f) => ({ ...f, opt2: c === true }))}
          value=""
          className="w-4 h-4 focus:ring-0 focus:outline-none"
        />
        Accept the terms of Compends
      </label>
      <div className=""></div>
    </>
  );
}
