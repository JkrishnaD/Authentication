"use client";

import { useCurrentUser } from "@/hooks/curent-user";
import { UserInfo } from "../_components/user-info";
import AnimatedContainer from "@/components/animations/AnimatedComponent";

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <AnimatedContainer>
      <UserInfo label="Client Component" user={user} />
    </AnimatedContainer>
  );
};

export default ClientPage;
