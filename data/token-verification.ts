import { db } from "@/libs";

export const getVErficationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
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
  