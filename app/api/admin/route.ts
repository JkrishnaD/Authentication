import { currentRole } from "@/libs/server";
import { UserRole } from "@prisma/client";

export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new Response(JSON.stringify({ success: "Server Action Allowed" }), {
      status: 200,
    });
  }
  return new Response(JSON.stringify({ error: "Server Action Not Allowed" }), {
    status: 403,
  });
}
