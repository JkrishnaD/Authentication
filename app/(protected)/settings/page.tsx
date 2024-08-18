"use client";

import { settings } from "@/actions/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/curent-user";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// Routes which can accesible for the logged in user
const SettingsPage = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    },
  });

  const onClick = (values: z.infer<typeof SettingsSchema>) => {
    console.log("hi there");
    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          update();
          setSuccess(data.success);
          reset();
        }
      });
    });
  };

  return (
    <Card className="w-[400px] lg:w-[600px] font-semibold">
      <CardHeader className="flex justify-center">
        <p className="text-xl font-bold font-sans">🔩 Settings</p>
      </CardHeader>
      <CardBody>
        <form
        {...register}
          onSubmit={handleSubmit(onClick)}
          className="space-y-2"
        >
          <Input
            variant="bordered"
            {...register("name")}
            size="md"
            type="text"
            label="Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm font-sans">
              {errors.name.message}
            </span>
          )}
          {user?.isOAuth === undefined && (
            <>
              <Input
                variant="bordered"
                {...register("email")}
                size="md"
                type="email"
                label="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-sans">
                  {errors.email.message}
                </span>
              )}
              {/* <Input
                variant="bordered"
                {...register("password")}
                size="md"
                label="Password"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm font-sans">
                  {errors.password.message}
                </span>
              )}
              <Input
                variant="bordered"
                {...register("newPassword")}
                size="md"
                label="New Passowrd"
                type="password"
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm font-sans">
                  {errors.newPassword.message}
                </span>
              )} */}
              <div className="flex justify-between items-center py-3 px-3 font-sans border rounded-lg text-sm">
                <p> Enable Two Factor Authentication</p>
                <Switch color="primary" disabled={isPending} {...register("isTwoFactorEnabled")}  />
              </div>
            </>
          )}
          <Select label="Select Your Role" placeholder={user?.role}{...register("role")}>
            <SelectItem value={UserRole.ADMIN} key={UserRole.ADMIN}>
              ADMIN
            </SelectItem>
            <SelectItem value={UserRole.USER} key={UserRole.USER}>
              USER
            </SelectItem>
          </Select>
          <FormSuccess message={success} />
          <FormError message={error} />
          <CardFooter className="flex justify-center">
            <Button
              variant="bordered"
              radius="sm"
              className="bg-black border-none text-white"
              isDisabled={isPending}
              type="submit"
            >
              Update Settings
            </Button>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
};

export default SettingsPage;
