"use server";

import { getVerficationTokenByToken } from "@/data/token-verification";
import { getUserEmail } from "@/data/user";
import { db } from "@/libs";

export const newVerification = async (token: string) => {
  const userToken = await getVerficationTokenByToken(token);

  if (!userToken) {
    return { error: "Token Doesn't exist" };
  }

  const hasExpired = new Date(userToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token Has Expired" };
  }

  const existingUser = await getUserEmail(userToken.email);

  if (!existingUser) {
    return { error: "User Doesn't exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: { emailVerified: new Date(), email: userToken.email },
  });

  await db.verificationToken.delete({
    where: { id: userToken.id },
  });

  return { success: "Verification Success" };
};
