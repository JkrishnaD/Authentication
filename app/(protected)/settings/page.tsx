"use client";

import { logout } from "@/actions/logout";
import { useCurrentUserSession } from "@/hooks/curent-user";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

// Routes which can accesible for the logged in user
const SettingsPage = () => {
  const details = useCurrentUserSession();

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 flex flex-col items-center rounded-lg">
      {/* {JSON.stringify(details)} */}
        <Button
          onClick={onClick}
          variant="bordered"
          className="font-sans font-semibold"
          type="submit">
          Sign Out
        </Button>
    </div>
  );
};

export default SettingsPage;
