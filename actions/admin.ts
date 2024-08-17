import { UserRole } from "@prisma/client";
import { currentRole } from "../libs/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const admin = async () => {
  const session = await auth();
  //@ts-ignore
  if (session?.user.role === UserRole.ADMIN) {
    return { success: "Server Action Allowed" };
  }
  return { error: "Server Action Not Allowed" };
};
