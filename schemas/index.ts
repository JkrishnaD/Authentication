import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message:"Enter the email"
  }),
  password: z.string().min(1,{
    message:"Invalid Password"
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
  