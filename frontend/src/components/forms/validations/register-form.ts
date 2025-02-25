import { z } from "zod";

const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: "'email' field is required" })
      .min(1, "Email is required")
      .email(),
    username: z
      .string({ required_error: "'username' field is required" })
      .min(1, "Username is required"),
    password: z
      .string({ required_error: "'password' field is required" })
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({ required_error: "'confirmPassword' field is required" })
      .min(8, "You must confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default registerFormSchema;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
