import { db } from "@/libs";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorEmail = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorEmail;
  } catch (error) {
    return null;
  }
};
