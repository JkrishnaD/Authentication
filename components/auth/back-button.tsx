import { Button } from "@nextui-org/react";
import Link from "next/link";

interface backButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: backButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <Button className="text-slate-600 hover:underline w-full bg-white">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};
