"use client";

import {
  IconAlertCircle,
  IconBrandMailgun,
  IconEye,
  IconEyeX,
  IconLock,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FieldDescription } from "@/components/ui/field";
import { useRouter } from "next/navigation";

import { signIn } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

type LoginValues = {
  userName: string;
  email: string;
  password: string;
};

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
} as const;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-center gap-2 rounded-[4] bg-[#FF694A] px-3 py-1.5 text-sm font-semibold text-black"
    >
      <IconAlertCircle size={18} stroke={1.75} />
      {message}
    </p>
  );
}

export default function LoginLabels() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginValues>();

  const [isLocked, setIsLocked] = React.useState(true);
  const [isFocused1, setIsFocused1] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const [isFocused3, setIsFocused3] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const router = useRouter();
  const [authError, setAuthError] = React.useState("");

  const onLoginSubmit = async (data: LoginValues) => {
    setAuthError("");

    try {
      await signIn(data.email, data.password);
    } catch (err: any) {
      setAuthError(err);
    }

    router.push("/user_perfil-page");
    router.refresh();
  };

  const userName = watch("userName");

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onLoginSubmit)}
        className="flex min-h-[50vh] w-full max-w-sm flex-col gap-11 h-sm:gap-7"
      >
        <label className="flex flex-col gap-2 text-white font-semibold font-josefin text-[15px] h-sm:text-[14.6px]">
          <span>
            {userName ? (
              <>
                Welcome back <strong>@{userName}!</strong>
              </>
            ) : (
              "What's your username?"
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
                required: "Username is required",
                minLength: { value: 5, message: "Min length is 5 characters" },
                onBlur: () => setIsFocused1(false),
              })}
              type="text"
              id="userName-field"
              onFocus={() => setIsFocused1(true)}
              className={inputClass}
              initial={{ borderRadius: "15px" }}
              whileHover={{ scale: 1.02, borderRadius: "6px" }}
              whileFocus={{ borderRadius: "6px", scale: 1.02 }}
              transition={spring}
              placeholder="e.g: Luninjag"
            />
          </motion.div>
          {errors.userName ? (
            <FieldError message={errors.userName.message} />
          ) : (
            <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
              Same username as always, no @ needed
            </FieldDescription>
          )}
        </label>

        {/* 





        */}

        <label className="flex flex-col gap-2 text-white font-semibold font-josefin text-[15px] h-sm:text-[14.6px]">
          Your email on Compends:
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
                onBlur: () => setIsFocused2(false),
              })}
              type="email"
              id="email-field"
              onFocus={() => setIsFocused2(true)}
              className={inputClass}
              initial={{ borderRadius: "15px" }}
              whileHover={{ scale: 1.02, borderRadius: "6px" }}
              whileFocus={{ borderRadius: "6px", scale: 1.02 }}
              transition={spring}
              placeholder="e.g: compends@gmail.com"
            />
          </motion.div>
          {errors.email ? (
            <FieldError message={errors.email.message} />
          ) : (
            <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
              The email you linked to follow your journey here
            </FieldDescription>
          )}
        </label>

        {/* 





        */}

        <label className="flex flex-col gap-2 text-white font-semibold font-josefin text-[15px] h-sm:text-[14.6px]">
          Your password:
          <motion.div
            className="relative"
            initial="rest"
            whileHover="hover"
            animate={isFocused3 ? "focus" : "rest"}
          >
            <motion.div
              variants={iconVariants}
              transition={spring}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 h-sm:left-5 2xl:left-6"
              onHoverStart={() => setHover(true)}
              onHoverEnd={() => setHover(false)}
            >
              <button
                type="button"
                aria-label={isLocked ? "Show password" : "Hide password"}
                onClick={() => setIsLocked((v) => !v)}
                className="cursor-pointer flex items-center justify-center leading-none"
              >
                {hover ? (
                  isLocked ? (
                    <IconEye stroke={1.75} size={23} />
                  ) : (
                    <IconEyeX stroke={1.75} size={23} />
                  )
                ) : (
                  <IconLock stroke={1.5} size={23} />
                )}
              </button>
            </motion.div>

            <motion.input
              {...register("password", {
                required: "Password is required",
                onBlur: () => setIsFocused3(false),
              })}
              type={isLocked ? "password" : "text"}
              id="password-field"
              onFocus={() => setIsFocused3(true)}
              className={inputClass}
              initial={{ borderRadius: "15px" }}
              whileHover={{ scale: 1.02, borderRadius: "6px" }}
              whileFocus={{ borderRadius: "6px", scale: 1.02 }}
              transition={spring}
              placeholder="Your password here..."
            />
          </motion.div>
          {errors.password ? (
            <FieldError message={errors.password.message} />
          ) : (
            <FieldDescription className="text-[#B9B9BD] ml-[2%] h-sm:text-[13px]">
              Keep it private, we keep it encrypted
            </FieldDescription>
          )}
        </label>

        {/* 





        */}

        <div className="flex left-20 right-20 justify-end gap-3 z-50 fixed 1xl:bottom-9 h-sm:bottom-1 2xl:bottom-9 h-sm:pb-4 ml-auto">
          <motion.button
            key="next"
            type="submit"
            animate={{ scale: 1 }}
            className="text-white flex items-center justify-center w-32 h-12 bg-[#6c3deece] rounded-[14px] cursor-pointer text-[20px] h-sm:w-30 h-sm:h-10 2xl:w-30 2xl:h-11 h-sm:rounded-[12px] h-sm:text-[18px] border-[2] border-transparent font-mitr"
            whileHover={{ scale: 1.05, borderColor: "white" }}
            whileTap={{ scale: 0.9 }}
            transition={spring}
          >
            Log In <span className="pl-2">{" ➜"}</span>
          </motion.button>
          {authError && <FieldError message={authError} />}
        </div>
      </form>
    </div>
  );
}
