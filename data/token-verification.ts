"use server"
import { db } from "@/libs";

export const getVerficationTokenByToken = async (token: string) => {
  try {
    const existingToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return existingToken;
  } catch (error) {
    return null;
  }
};

export const getVerficationTokenByEmail = async (email: string) => {
  try {
    const verificationEmail = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationEmail;
  } catch (error) {
    return null;
  }
};
