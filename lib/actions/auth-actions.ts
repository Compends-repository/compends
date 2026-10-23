"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const signUp = async (name: string, email: string, password: string, birthDate: Date, opt1: boolean, opt2: boolean) => {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      birthDate,
      opt1,
      opt2,
      callbackURL: "/user_perfil-page",
    },
  });

  return result
};


export const signIn = async (email: string, password: string) => {
    const result = await auth.api.signInEmail({
        body: {
            email, 
            password,
            rememberMe: true,
            callbackURL: "/user_perfil-page",
        }
    })

    return result
}


export const signOut = async () => {
    const result = await auth.api.signOut({
        headers: await headers()
    })

    return result
}