import { z } from "zod";

const loginFormSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

export default loginFormSchema;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
