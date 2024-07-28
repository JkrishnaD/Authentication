import React from "react";
import { auth, signOut } from "../../../auth";
import { Button } from "@nextui-org/react";
// Routes which can accesible for the logged in user
const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="h-screen flex justify-center w-screen items-center bg-gradient-to-tl from-sky-300 to-blue-700">
      <div className="bg-white flex flex-col w-fit justify-center items-center gap-y-4 text-black font-sans rounded-lg p-3 font-semibold"
      >
        {JSON.stringify({session})}
        <form action={async ()=>{
          "use server";

          await signOut();
        }}>
          <Button variant="bordered" className="font-sans font-semibold" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
