import React from "react";
import { auth } from "../../../auth";
// Routes which can accesible for the logged in user
const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="h-screen flex justify-center w-auto items-center   bg-gradient-to-tl from-sky-300 to-blue-700">
      <div className="bg-white text-black font-sans rounded-lg p-3 font-semibold"
      >
        {JSON.stringify(session)}
      </div>
    </div>
  );
};

export default SettingsPage;
