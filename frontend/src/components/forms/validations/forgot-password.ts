import { z } from "zod";

const forgotPasswordFormSchema = z.object({
  email: z
    .string({ required_error: "'email' field is required" })
    .min(1, "Email is required")
    .email(),
});

export default forgotPasswordFormSchema;

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;
