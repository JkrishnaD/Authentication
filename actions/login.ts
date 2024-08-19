"use server";

import { signIn } from "@/auth";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserEmail } from "@/data/user";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/libs/mail";
import { createTwoFactorToken, createVerificationToken } from "@/libs/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { db } from "@/libs";
import { getTwoFactorConfirmationById } from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null
) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation) {
    return { error: "Invalid Values" };
  }

  const { email, password, code }: any = validation.data;

  const existingUser = await getUserEmail(email);

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

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid Code" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Token Expired" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConformation = await getTwoFactorConfirmationById(
        existingUser.id
      );

      if (existingConformation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConformation.id },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await createTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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
