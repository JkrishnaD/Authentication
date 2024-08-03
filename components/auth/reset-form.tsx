"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { ResetSchema } from "@/schemas";
import { resetPassword } from "@/actions/reset";


export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values:any) => {
    setError("");
    setSuccess("");

    startTransition(()=>{
      resetPassword(values)
       .then((data:any)=>{
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
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
          Send Reset Email
        </Button>
      </form>
    </CardWrapper>
  );
};
