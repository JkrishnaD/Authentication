"use server";

import { SignupSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { getUSerEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validation = SignupSchema.safeParse(values);

  if (!validation) {
    return { error: "Invalid Values" };
  }

  const { email, password, name }: any = validation.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUSerEmail(email)

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

  return { success: "Account Created" };
};
