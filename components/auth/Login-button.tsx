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

  return (
    <Link href="/auth/login" className="cursor-pointer">
      {children}
    </Link>
  );
};
