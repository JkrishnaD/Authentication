import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tl from-sky-300 to-blue-700">
      {children}
    </div>
  );
};
export default AuthLayout;
