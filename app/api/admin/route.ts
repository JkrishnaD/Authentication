import { currentRole } from "@/libs/server";
import { UserRole } from "@prisma/client";

export async function GET() {
  const role = await currentRole();
  //@ts-ignore
  if (role === UserRole.ADMIN) {
    return { success: "Server Action Allowed" };
  }
  return { error: "Server Action Not Allowed" };
}
