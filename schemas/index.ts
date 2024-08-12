import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message:"Enter the email"
  }),
  password: z.string().min(1,{
    message:"Invalid Password"
  }),
  code:z.optional(z.string())
});

export const ResetSchema = z.object({
  email: z.string().email({
    message:"Enter the email"
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6,{
    message:"Mininum 6 Letters"
  }),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message:"Enter the email"
  }),
  password: z.string().min(6,{
    message:"Min length 6"
  }),
  name: z.string({
    message:"Name Should Be Provided"
  }).nonempty()
});
  