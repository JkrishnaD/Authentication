import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUSerEmail } from "./data/user";
import Github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export default {
  providers: [
    Github({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
    credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);
        
        if (validation.success) {
          const { email, password }: any = validation.data;

          const user = await getUSerEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compareSync(password,user.password);
          if(passwordMatch){
            return user
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
