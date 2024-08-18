"use client";
import AnimatedContainer from "@/components/animations/AnimatedComponent";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { RoleGate } from "../_components/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
  const adminApiRoutes = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed Api Route");
      } else {
        toast.error("Not Allowed");
      }
    });
  };

  const serverAction = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      }

      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  return (
    <AnimatedContainer>
      <Card className="lg:w-[600px] w-[400px]">
        <CardHeader className="flex justify-center font-semibold font-sans">
          🔑 Admin Component
        </CardHeader>
        <CardBody className="space-y-4">
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message="You are authorized to see" />
          </RoleGate>
          <div className="flex flex-row justify-between items-center rounded-lg shadow-md p-2">
            <p className="text-sm font-semibold">Admin-only Api routes</p>
            <Button onClick={adminApiRoutes} variant="bordered" radius="sm">
              Click To Test
            </Button>
          </div>
          <div className="flex flex-row justify-between items-center rounded-lg shadow-md p-2">
            <p className="text-sm font-semibold">Admin-only Server Action</p>
            <Button onClick={serverAction} variant="bordered" radius="sm">
              Click To Test
            </Button>
          </div>
        </CardBody>
      </Card>
    </AnimatedContainer>
  );
};

export default AdminPage;
