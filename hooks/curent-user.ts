import { useSession } from "next-auth/react";

export const useCurrentUserSession = () => {
  const session = useSession();
  
  return session.data?.user;
};
