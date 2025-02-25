import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, MailCheck } from "lucide-react";

import { requestPassword } from "@/api/endpoints";
import forgotPasswordFormSchema, {
  ForgotPasswordFormValues,
} from "./validations/forgot-password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ForgotPasswordFormProps = {
  setFormType?: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forgot_password">
  >;
};

/**
 * TODO:
 *
 * - Handle login errors sent from Django.
 */
export default function ForgotPasswordForm({
  setFormType,
}: ForgotPasswordFormProps) {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setSuccessMessage("");

    try {
      // Send Password Reset
      const res = await requestPassword(values);
      if (res.status === 200) {
        toast.success("Successful Submission.");
        setSuccessMessage(
          "You will be emailed a password reset link if your email is in our system."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xs w-full space-y-4">
      {successMessage && (
        <div className="border border-emerald-500 rounded-md p-3 flex items-center gap-x-4">
          <MailCheck className="stroke-emerald-500" />
          <p>{successMessage}</p>
        </div>
      )}
      <h1 className="text-2xl">Reset Password</h1>

      <Form {...form}>
        <form
          id="credentials-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required_field">Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.isSubmitting ? (
            <Button
              type="button"
              className="w-full cursor-not-allowed flex items-center gap-x-3"
              disabled
            >
              <Loader2 className="animate-spin" />
              Submitting...
            </Button>
          ) : (
            <Button
              type="submit"
              form="credentials-form"
              className="w-full cursor-pointer"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>

      {!!setFormType && (
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 cursor-pointer"
            onClick={() => setFormType("login")}
          >
            Back to Login
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 cursor-pointer"
            onClick={() => setFormType("register")}
          >
            Register an Account
          </Button>
        </div>
      )}
    </div>
  );
}
