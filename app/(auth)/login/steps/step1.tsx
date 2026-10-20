import {
  IconBrandMailgun,
  IconEye,
  IconEyeX,
  IconLock,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import React from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  Watch,
} from "react-hook-form";
import { FieldDescription } from "@/components/ui/field";

import type { FormValues } from "../labels";

const inputClass =
  "w-full bg-white pl-11 pr-4 py-2.5 text-black text-base font-normal h-sm:px-6 h-sm:py-2.5 h-sm:pl-14 h-sm:pr-6 2xl:px-8 2xl:py-3 2xl:pl-16 2xl:pr-8 3xl:px-8 3xl:py-3 3xl:pl-16 3xl:pr-8 outline-[#808080]";

const iconVariants = {
  rest: { scale: 1, color: "#808080" },
  hover: { scale: 1.15, color: "#000000", translateX: "-5px" },
  focus: { scale: 1.15, color: "#000000", translateX: "-5px" },
};

const spring = {
  type: "spring",
  stiffness: 360,
  damping: 22,
  duration: 0.08,
} as const;

export default function Step1({ register, errors, watch }: any) {
  const [isLocked, setIsLocked] = React.useState(true);

  const [isFocused1, setIsFocused1] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const [isFocused3, setIsFocused3] = React.useState(false);

  const [Hover, setHover] = React.useState(false);

  const userName = watch("userName");

  return (
    <>
      <label className="flex flex-col gap-2 text-white font-semibold font-josefin text-[15px] h-sm:text-[14.6px]">
        <span>
          {userName ? (
            <>
              We Are happy to see you here <strong>@{userName}</strong>
            </>
          ) : (
            "Choose a username:"
          )}
        </span>

        <motion.div
          className="relative"
          initial="rest"
          whileHover="hover"
          animate={isFocused1 ? "focus" : "rest"}
        >
          <motion.div
            variants={iconVariants}
            transition={spring}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 h-sm:left-5 2xl:left-6"
          >
            <IconBrandMailgun stroke={1.5} size={23} />
          </motion.div>

          <motion.input
            {...register("userName", {
              required: "First name is required",
              minLength: { value: 5, message: "Min length is 5 digits" },
            })}
            type="text"
            id="userName-field"
            onBlurCapture={(e) => {
              setIsFocused1(false);
            }}
            className={inputClass}
            initial={{ borderRadius: "15px" }}
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
            whileHover={{ scale: 1.02, borderRadius: "6px" }}
            whileFocus={{ borderRadius: "6px", scale: 1.02 }}
            transition={spring}
            placeholder="e.g: Luninjag"
          />
        </motion.div>
        <p>{errors.userName?.message}</p>
        <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
          Just choose the best name you have in mind
        </FieldDescription>
      </label>

      <label className="flex flex-col gap-2 text-white font-semibold font-josefin text-[15px] h-sm:text-[14.6px]">
        Your email:
        <motion.div
          className="relative"
          initial="rest"
          whileHover="hover"
          animate={isFocused2 ? "focus" : "rest"}
        >
          <motion.div
            variants={iconVariants}
            transition={spring}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 h-sm:left-5 2xl:left-6"
          >
            <IconMail stroke={1.5} size={23} />
          </motion.div>

          <motion.input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            type="email"
            id="email-field"
            required
            onBlur={(e) => {
              setIsFocused2(false);
            }}
            className={inputClass}
            initial={{ borderRadius: "15px" }}
            onFocus={() => setIsFocused2(true)}
            whileHover={{ scale: 1.02, borderRadius: "6px" }}
            whileFocus={{ borderRadius: "6px", scale: 1.02 }}
            transition={spring}
            placeholder="e.g: compends@gmail.com"
          />
        </motion.div>
        <p>{errors.email?.message}</p>
        <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
          Don't put fake e-mails, we will verify that
        </FieldDescription>
      </label>

      <label className="flex flex-col gap-2 text-white font-semibold font-josefin text-[15px] h-sm:text-[14.6px]">
        Create a password:
        <motion.div
          className="relative"
          initial="rest"
          whileHover="hover"
          animate={isFocused3 ? "focus" : "rest"}
        >
          <motion.div
            variants={iconVariants}
            transition={spring}
            className="cursor-pointer absolute left-4 top-1/2 z-10 -translate-y-1/2 h-sm:left-5 2xl:left-6"
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
          >
            {Hover ? (
              isLocked ? (
                <IconEye
                  stroke={1.75}
                  size={23}
                  onClick={() => setIsLocked(!isLocked)}
                />
              ) : (
                <IconEyeX
                  stroke={1.75}
                  size={23}
                  onClick={() => setIsLocked(!isLocked)}
                />
              )
            ) : (
              <IconLock
                stroke={1.5}
                size={23}
                onClick={() => setIsLocked(!isLocked)}
              />
            )}
          </motion.div>

          <motion.input
            {...register("password", {
              required: "Passowrd is required",
            })}
            type={isLocked ? "password" : "text"}
            id="password-field"
            required
            onBlur={(e) => {
              setIsFocused3(false);
            }}
            className={inputClass}
            initial={{ borderRadius: "15px" }}
            onFocus={() => setIsFocused3(true)}
            whileHover={{ scale: 1.02, borderRadius: "6px" }}
            whileFocus={{ borderRadius: "6px", scale: 1.02 }}
            transition={spring}
            placeholder="Your password here..."
          />
        </motion.div>
        <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
          Your password is stored securely, so don't worry
        </FieldDescription>
      </label>
    </>
  );
}
