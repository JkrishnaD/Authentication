import { db } from "@/libs";

export const getResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.passwordToken.findUnique({
      where: {
        token,
      },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.passwordToken.findFirst({
      where: {
        email,
      },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};
