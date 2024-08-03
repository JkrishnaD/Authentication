import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Footer = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full p-2 gap-x-2">
      <Button
        onClick={()=>{onClick("google")}}
        className="bg-white w-full"
        radius="sm"
        size="lg"
        variant="bordered"
      >
        <FcGoogle></FcGoogle>
      </Button>
      <Button
      onClick={()=>{onClick("github")}}
        className=" bg-white w-full"
        radius="sm"
        size="lg"
        variant="bordered"
      >
        <FaGithub></FaGithub>
      </Button>
    </div>
  );
};
