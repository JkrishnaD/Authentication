"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <div onClick={onClick} className="cursor-pointer font-sans font-bold text-red-500 flex items-center">
      {children}
    </div>
  );
};
