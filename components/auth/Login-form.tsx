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
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

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

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    try {
      startTransition(() => {
        login(data).then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
      });
      reset();
    } catch (error) {}
  };
  return (
      <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Don't Have an Account"
        backButtonHref="/auth/signup"
      >
        <form
          {...register}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="w-full flex flex-col gap-4 p-1">
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            variant="solid"
            radius="sm"
            className="bg-black text-white w-full"
            type="submit"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </CardWrapper>
  );
};