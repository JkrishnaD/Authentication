import { db } from "@/libs";

export const getTwoFactorConfirmationById = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
};
