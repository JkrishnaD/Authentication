"use client";

import { useCurrentUserSession } from "@/hooks/curent-user";
import { UserInfo } from "../_components/user-info";

const ClientPage = () => {
  const user = useCurrentUserSession();
  return <UserInfo label="Client Component" user={user} />;
};

export default ClientPage;
