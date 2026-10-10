import { motion } from "motion/react";
import React from "react";

import { useForm } from "react-hook-form";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

type FormData = {
  userName: string;
  email: string;
  password: string;
  birthDate: Date | undefined;
  opt1: boolean;
  opt2: boolean;
};

type Step1Props = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function Step1({ form, setForm }: Step1Props) {
  return (
    <>
      <label className="flex flex-col gap-2 text-white font-semibold font-kanit text-[15px] h-sm:text-[14.6px]">
        <span>
          {form.userName ? (
            <>
              We are happy to see you here <strong>@{form.userName}</strong>!
            </>
          ) : (
            "Choose a username:"
          )}
        </span>

        <motion.input
          type="text"
          name="userName-field"
          id="userName_field"
          value={form.userName}
          onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))}
          required
          className="bg-white px-4 py-2.5 text-black text-base font-normal h-sm:px-6 h-sm:py-2.5 2xl:px-8 2xl:py-3 3xl:px-8 3xl:py-3 outline-[#808080]"
          initial={{ borderRadius: "15px" }}
          whileHover={{ scale: 1.02, borderRadius: "6px" }}
          whileFocus={{ borderRadius: "6px", scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 22,
            duration: 0.08,
          }}
          placeholder="e.g: luninjag..."
        />
        <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
          Just choose the best name you have in mind
        </FieldDescription>
      </label>

      <label className="flex flex-col gap-2 text-white font-semibold font-kanit text-[15px] h-sm:text-[14.6px]">
        Your email:
        <motion.input
          type="email"
          name="email-field"
          id="email-field"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="bg-white px-4 py-2.5 text-black text-base font-normal h-sm:px-6 h-sm:py-2.5 2xl:px-8 2xl:py-3 3xl:px-8 3xl:py-3 outline-[#808080]"
          initial={{ borderRadius: "15px" }}
          whileHover={{ scale: 1.02, borderRadius: "6px" }}
          whileFocus={{ borderRadius: "6px", scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 22,
            duration: 0.08,
          }}
          placeholder="e.g: compends@gmail.com..."
        />
        <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
          Don't put fake e-mails bro, we will verify that
        </FieldDescription>
      </label>

      <label className="flex flex-col gap-2 text-white font-semibold font-kanit text-[15px] h-sm:text-[14.6px]">
        Create a password:
        <motion.input
          type="password"
          name="password-field"
          id="password-field"
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="bg-white px-4 py-2.5 text-black text-base font-normal h-sm:px-6 h-sm:py-2.5 2xl:px-8 2xl:py-3 3xl:px-8 3xl:py-3 outline-[#808080]"
          initial={{ borderRadius: "15px" }}
          whileHover={{ scale: 1.02, borderRadius: "6px" }}
          whileFocus={{ borderRadius: "6px", scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 22,
            duration: 0.08,
          }}
          placeholder="Your password here..."
        />
        <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
          Your password is stored securely, so don't worry bro
        </FieldDescription>
      </label>
    </>
  );
}
