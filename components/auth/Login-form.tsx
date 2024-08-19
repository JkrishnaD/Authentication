"use client";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useSearchParams } from "next/navigation";
import { Footer } from "./cardFooter";
import Link from "next/link";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const errorUrl =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Logged By Different Provider"
      : "";
  const callbackUrl = searchParams.get("callback");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    try {
      startTransition(() => {
        login(values,callbackUrl).then((data) => {
          if (data?.error) {
            setError(data?.error);
            reset();
          }
          if (data?.success) {
            setError(data?.error);
            reset();
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        });
      });
    } catch (error) {
      setError("Something Went Wrong");
    }
  };

  return (
    <CardWrapper
      headerLabel={showTwoFactor ? "Verify It's You" : "Welcome Back"}
      backButtonLabel="Don't Have an Account"
      backButtonHref="/auth/signup"
    >
      <form
        {...register}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex justify-center pt-1 items-center flex-col"
      >
        {showTwoFactor && (
          <>
            <Input
              label="Verification Code"
              placeholder="123456"
              variant="bordered"
              labelPlacement="outside"
              radius="sm"
              errorMessage={errors.code?.message}
              {...register("code")}
              disabled={isPending}
            />
            {errors.code && (
              <span className="text-red-500 text-sm font-sans">
                {errors.code.message}
              </span>
            )}
          </>
        )}
        {!showTwoFactor && (
          <>
            <div className="w-full flex flex-col gap-4 pt-1">
              <Input
                label="Email"
                type="email"
                placeholder="zack@gmail.com"
                variant="bordered"
                labelPlacement="outside"
                radius="sm"
                errorMessage={errors.email?.message}
                {...register("email")}
                disabled={isPending}
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-sans">
                  {errors.email.message}
                </span>
              )}
              <Input
                label="Password"
                placeholder="******"
                type="password"
                variant="bordered"
                labelPlacement="outside"
                radius="sm"
                errorMessage={errors.password?.message}
                disabled={isPending}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm font-sans">
                  {" "}
                  {errors.password.message}
                </span>
              )}
            </div>
            <Link
              className="font-sans text-sm text-slate-500 hover:underline"
              href="/auth/reset"
            >
              Forgot Password?
            </Link>
          </>
        )}
        <FormError message={error || errorUrl} />
        <FormSuccess message={success} />
        <Button
          variant="solid"
          radius="sm"
          className="bg-black text-white w-full"
          type="submit"
          isDisabled={isPending}
        >
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
        <Footer />
      </form>
    </CardWrapper>
  );
};
