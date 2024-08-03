"use server";

import { getUserEmail } from "@/data/user";
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
  
  return { success: "Reset Email Sent" };
};
