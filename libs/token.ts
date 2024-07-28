import { db } from "@/libs";
import { getVerficationTokenByEmail } from "@/data/token-verification";
import { v4 as uuid } from "uuid";

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
      expired: expires,
    },
  });
  return verificationToken;
};
