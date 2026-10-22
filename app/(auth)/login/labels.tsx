import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { signUp } from "@/lib/actions/auth-actions";

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

export type FormValues = {
  userName: string;
  email: string;
  password: string;
  birthDate: Date | undefined;
  opt1: boolean;
  opt2: boolean;
};

export default function FormLabels() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      birthDate: undefined,
      opt1: false,
      opt2: false,
    },
  });

  const spring = {
    type: "spring",

    duration: 0.04,
  } as const;

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (!formData.birthDate) {
      setError("Informe sua data de nascimento.");
      return;
    }

    await signUp(
      formData.userName,
      formData.email,
      formData.password,
      formData.birthDate,
      formData.opt1,
      formData.opt2,
    );

    router.push("/user_perfil-page");
  };

  const btnStyle =
    "text-white flex items-center justify-center w-12 h-12 bg-[#6c3deece] rounded-[14px] cursor-pointer text-[20px] h-sm:w-10 h-sm:h-10 h-sm:rounded-[12px] h-sm:text-[18px] border-[2px] border-transparent";

  async function handleNext() {
    const ok = await trigger(["userName", "email", "password"]);

    if (ok) {
      setStep(2);
    }
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
        {step === 1 && (
          <Step1 register={register} errors={errors} watch={watch} />
        )}

        {step === 2 && (
          <Step2 control={control} errors={errors} watch={watch} />
        )}

        <div className="flex left-20 right-20 justify-end gap-3 z-50 fixed 1xl:bottom-9 h-sm:bottom-1 2xl:bottom-9 h-sm:pb-4 ml-auto">
          <AnimatePresence>
            {step > 1 && (
              <motion.button
                key="back"
                type="button"
                onClick={handleBack}
                className={btnStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05, borderColor: "white" }}
                whileTap={{ scale: 0.9 }}
                transition={spring}
              >
                {"<"}
              </motion.button>
            )}
          </AnimatePresence>

          {step === 1 ? (
            <motion.button
              key="next"
              type="button"
              animate={{ scale: 1 }}
              onClick={handleNext}
              className={btnStyle}
              whileHover={{ scale: 1.05, borderColor: "white" }}
              whileTap={{ scale: 0.9 }}
              transition={spring}
            >
              {">"}
            </motion.button>
          ) : (
            <motion.button
              key="submit"
              type="submit"
              className={btnStyle}
              whileHover={{ scale: 1.05, borderColor: "white" }}
              whileTap={{ scale: 0.9 }}
              transition={spring}
            >
              {">"}
            </motion.button>
          )}
        </div>

        <p className="fixed 1xl:bottom-9 h-sm:bottom-1 2xl:bottom-9 left-20 text-chart-2 font-bold font-saira pb-3 h-sm:pb-6 text-[15px] ">
          Etapa: {step}
        </p>
      </form>
    </div>
  );
}
