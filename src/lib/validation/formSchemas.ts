import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Field must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Field must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
