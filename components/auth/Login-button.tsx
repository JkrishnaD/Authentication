"use client";
import Link from "next/link";

interface loginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: loginButtonProps) => {

  if(mode ==="modal"){
    return <span>
      Todo : Implement Modal
    </span>
  }
  return (
    <Link href="/auth/login" className="cursor-pointer">
      {children}
    </Link>
  );
};
