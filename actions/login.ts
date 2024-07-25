"use server";
import { getUSerEmail } from '@/data/user';
import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation) {
    return { error: "Invalid Values" };
  }

  const { email, password }: any = validation.data;

  const userVerification = await getUSerEmail(email);

  if (!userVerification) {
    return { error: "User Doesn't Exist" };
  }

  return { success: "User Found!" };
};
