"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button, } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-primary-50 p-3 rounded-md flex justify-between flex-col items-center lg:w-[600px] lg:flex-row w-fit shadow-sm">
      <div className="flex gap-x-3">
        <Button radius="sm" variant="ghost" color={pathname == "/settings" ? "primary" : "default"}>
          <Link href="/settings">Settings</Link>
        </Button>
        <Button radius="sm" variant="ghost" color={pathname == "/server" ? "primary" : "default"}>
          <Link href="/server">Server</Link>
        </Button>
        <Button radius="sm" variant="ghost"  color={pathname == "/client" ? "primary" : "default"}>
          <Link href="/client">Client</Link>
        </Button>
        <Button radius="sm" variant="ghost"  color={pathname == "/admin" ? "primary" : "default"}>
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <div className="pt-4 lg:p-3">
        <UserButton />
      </div>
    </nav>
  );
};
