import { ExtendedUser } from "@/next-auth";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface userInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: userInfoProps) => {
  return (
    <Card className="lg:w-[600px] w-[400px]">
      <CardHeader className="flex justify-center">
        <p className="font-semibold text-xl">{label}</p>
      </CardHeader>
      <CardBody className="space-y-2">
        <div className="flex flex-row justify-between border rounded-lg p-1 shadow-sm">
          <p className="font-bold pl-2 text-sm">ID</p>
          <p className="font-mono text-xs bg-slate-100 p-1 rounded-sm max-w-[200px]">{user?.id}</p>
        </div>
        <div className="flex flex-row justify-between border rounded-lg p-1 shadow-sm">
          <p className="font-bold pl-2 text-sm">Name</p>
          <p className="font-mono text-xs bg-slate-100 p-1 rounded-sm max-w-[200px]">{user?.name}</p>
        </div>
        <div className="flex flex-row justify-between border rounded-lg p-1 shadow-sm">
          <p className="font-bold pl-2 text-sm">Email</p>
          <p className="font-mono text-xs bg-slate-100 p-1 rounded-sm max-w-[200px]">{user?.email}</p>
        </div>
        <div className="flex flex-row justify-between border rounded-lg p-1 shadow-sm">
          <p className="font-bold pl-2 text-sm">Role</p>
          <p className="font-mono text-xs bg-slate-100 p-1 rounded-sm max-w-[200px]">{user?.role}</p>
        </div>
        <div className="flex flex-row justify-between border rounded-lg p-1 shadow-sm">
          <p className="font-bold pl-2 text-sm">Two Factor Authentication</p>
          <p className={`font-mono text-xs ${user?.isTwoFactorEnabled?"bg-emerald-400":"bg-red-500"} text-white p-1 rounded-sm max-w-[200px]`}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
