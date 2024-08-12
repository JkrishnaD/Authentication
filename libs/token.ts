import { db } from "@/libs";
import { getVerficationTokenByEmail } from "@/data/token-verification";
import { v4 as uuid } from "uuid";
import { getResetTokenByEmail } from "@/data/reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import crypto from "crypto"

export const createTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  
  const expires = new Date(new Date().getTime() + 300 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      email,
      expires,
    },
  });
  return twoFactorToken;
};

export const createResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const resetToken = await db.passwordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return resetToken;
};

export const createVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerficationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
