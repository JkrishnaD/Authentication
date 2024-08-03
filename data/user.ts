"use server"
import { db } from "@/libs";

export const getUserEmail = async (email: string) => {
  try {
    const userEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    return userEmail;
  } catch (error) {
    return null;
  }
};

export const getUserId = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
