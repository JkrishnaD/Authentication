"use server";

import { currentUser } from "@/libs/server";
import { UserInfo } from "../_components/user-info";
import AnimatedContainer from "@/components/animations/AnimatedComponent";

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div className=" flex flex-col justify-center items-center text-center">
      <AnimatedContainer>
        <UserInfo label="Server Component" user={user} />
      </AnimatedContainer>
    </div>
  );
};

export default ServerPage;
