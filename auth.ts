import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserId } from "./data/user";
import { db } from "./libs";
import { getTwoFactorConfirmationById } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { ExtendedUser } from "./next-auth";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // To allow the 0Auth providers withOut email verification
      if (account?.provider !== "credentials") return true;

      // To restrict the login without email verification
      const existingUser = await getUserId(user.id as string);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorconfirmation = await getTwoFactorConfirmationById(
          existingUser.id
        );
        if (!twoFactorconfirmation) {
          return false;
        }
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorconfirmation.id,
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      // to display the user id
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      //to display the role of the user
      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        (session.user as any).isTwoFactorEnabled =
          token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;

        session.user.email = token.email as string;
        (session.user as ExtendedUser).isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      //we can actually create custom fields in the session
      if (!token.sub) return token;

      const existingUser = await getUserId(token.sub);

      const existingAccount = await getAccountByUserId(token.sub);

      if (existingUser) {
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      }

      if (existingAccount) {
        token.isOAuth = !!existingAccount;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
