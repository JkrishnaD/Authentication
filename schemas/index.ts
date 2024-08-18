import { UserRole } from "@prisma/client";
import { z } from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
  })
  
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Enter the email",
  }),
  password: z.string().min(1, {
    message: "Invalid Password",
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Enter the email",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Mininum 6 Letters",
  }),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Enter the email",
  }),
  password: z.string().min(6, {
    message: "Min length 6",
  }),
  name: z
    .string({
      message: "Name Should Be Provided",
    })
});
