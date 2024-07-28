"use server";
import { signIn } from "@/auth";
import { getUSerEmail } from "@/data/user";
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

  const userVerification = await getUSerEmail(email);

  if (userVerification === null) {
    return { error: "User Doesn't Exist" };
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
