"use server";

import bcrypt from "bcryptjs";
import { getResetTokenByToken } from "@/data/reset-token";
import { getUserEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import z from "zod";
import { db } from "@/libs";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {

  if (!token) {
    return { error: "Token Doesn't exist" };
  }

  const validateUser = NewPasswordSchema.safeParse(values);

  if (!validateUser.success) {
    return { error: "invalid credentials" };
  }

  const { password } = validateUser.data;

  const existingToken = await getResetTokenByToken(token);
  if (!existingToken) {
    return { error: "invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Expired" };
  }

  const existingUser = await getUserEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email Doesn't Exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password Changed" };
};
