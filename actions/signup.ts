"use server";

import { SignupSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/libs";
import { getUserEmail } from "@/data/user";
import { createVerificationToken } from "@/libs/token";
import { sendVerificationEmail } from "@/libs/mail";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validation = SignupSchema.safeParse(values);

  if (!validation) {
    return { error: "Invalid Values" };
  }

  const { email, password, name }: any = validation.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserEmail(email);

  if (existingUser) {
    return { error: "Email Already in use" };
  }
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  const verificationToken = await createVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  
  return { success: "Conformation Email Sent" };
};
