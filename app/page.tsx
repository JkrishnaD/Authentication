import { LoginButton } from "@/components/auth/Login-button";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center bg-gradient-to-tl from-orange-400 to-red-600">
      <div className="space-y-4 text-center text-white">
        <h1 className=" text-6xl font-bold font-sans">🔐 Auth</h1>
        <p className="text-lg font-sans font-semibold">
          A Simple Authentication Provider
        </p>
        <LoginButton>
          <Button
            className="bg-white mt-4 text-black shadow-white font-sans font-semibold"
            radius="md"
            size="lg">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
