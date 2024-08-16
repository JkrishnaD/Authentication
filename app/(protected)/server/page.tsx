"use server"

import { currentUser } from "@/libs/server";
import { UserInfo } from "../_components/user-info";

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div className=" flex flex-col justify-center items-center text-center">
        <UserInfo label="Server Component" user={user} />
    </div>
  );
};

export default ServerPage;
