"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { NewPasswordSchema} from "@/schemas";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export const PasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values,token).then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
    reset();
  };

  return (
    <CardWrapper
      headerLabel="Forgot Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <form
        {...register}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="w-full flex flex-col gap-4 p-1">
          <Input
            label="Password"
            type="password"
            placeholder="******"
            variant="bordered"
            labelPlacement="outside"
            radius="sm"
            errorMessage={errors.password?.message}
            {...register("password")}
            disabled={isPending}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-sans">
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
          Confirm Password
        </Button>
      </form>
    </CardWrapper>
  );
};
