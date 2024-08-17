import { FormError } from "@/components/form-error";
import { useCurrentRole } from "@/hooks/current-role";
import { UserRole } from "@prisma/client";

interface roleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: roleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return <FormError message="You are not Authorized"/>;
  }
  return <>{children}</>;
};
