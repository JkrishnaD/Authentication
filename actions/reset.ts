"use server";

import { getUserEmail } from "@/data/user";
import { sendResetEmail } from "@/libs/mail";
import { createResetToken } from "@/libs/token";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validation = ResetSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid Credentials" };
  }

  const { email } = validation.data;

  const existingUser = await getUserEmail(email);
  if (!existingUser) {
    return { error: "Email Doesn't exist" };
  }

    const resetToken = await createResetToken(existingUser.email);
    await sendResetEmail(resetToken.email, resetToken.token);
    
  return { success: "Reset Email Sent" };
};
