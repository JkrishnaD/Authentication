"use server";

import { signIn } from "@/auth";
import { getUSerEmail } from "@/data/user";
import { sendVerificationEmail } from "@/libs/mail";
import { createVerificationToken } from "@/libs/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation) {
    return { error: "Invalid Values" };
  }

  const { email, password }: any = validation.data;

  const existingUser = await getUSerEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User Doesn't Exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await createVerificationToken(existingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification Email Sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw error;
  }
  return { success: "User Found!" };
};
