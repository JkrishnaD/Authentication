import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserId } from "./data/user";
import { db } from "./db";

const prisma = new PrismaClient();
//This is for adding the types which doesn't present in the schema
declare module "next-auth" {
  interface Session {
    user: {
      //add any fields here which required to get accessed by user in future
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}
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
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      //we can actually create custom fields in the session
      if (!token.sub) return token;

      const existingUser = await getUserId(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
