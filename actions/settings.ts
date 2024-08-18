"use server"

import bcrypt from "bcryptjs";
import { getUserEmail, getUserId } from "@/data/user";
import { db } from "@/libs";
import { sendVerificationEmail } from "@/libs/mail";
import { currentUser } from "@/libs/server";
import { createVerificationToken } from "@/libs/token";
import { SettingsSchema } from "@/schemas";
import { error } from "console";
import z from "zod";
import { newPassword } from "./new-password";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "UnAuthorized" };
  }

  const dbUser = await getUserId(user.id as string);

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email Already Exists" };
    }
    const verificationToken = await createVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification Email Sent" };
  }

  if (values.password && values.newPassword && dbUser?.password) {
    const passwordVerify = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordVerify) {
      return { error: "Password Incorrect" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword,10);

    values.password = hashedPassword
    values.newPassword = undefined
  }
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: {
      id: dbUser?.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated" };
};
