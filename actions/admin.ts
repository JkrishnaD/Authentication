"use server"

import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

export const admin = async () => {
  const session = await auth();

  if (session?.user.role === UserRole.ADMIN) {
    return { success: "Server Action Allowed" };
  }
  return { error: "Server Action Not Allowed" };
};
