import { z } from "zod";

const loginFormSchema = z.object({
  username: z
    .string({ required_error: "'username' field is required" })
    .min(1, "Username is required"),
  password: z
    .string({ required_error: "'password' field is required" })
    .min(8, "Invalid password"),
});

export default loginFormSchema;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
