import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signup } from "@/api/endpoints";
import { useAuthStore } from "@/lib/store";
import registerFormSchema, {
  RegisterFormValues,
} from "./validations/register-form";

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

type RegisterFormProps = {
  setFormType?: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forgot_password">
  >;
};

/**
 * TODO:
 *
 * - Handle login errors sent from Django.
 * - Handle Form loading states.
 */
export default function RegisterForm({ setFormType }: RegisterFormProps) {
  const loginUser = useAuthStore((state) => state.login);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // Register with AllAuth API. This logs the user in automatically :D!!
      const res = await signup(values);
      // Add the user to the zustand store
      loginUser(res.data.user);
      toast.success("Registration Successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xs w-full space-y-4">
      <h1 className="text-2xl">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: ADD CONFIRM PASSWORD */}

          <Button type="submit" className="w-full cursor-pointer">
            Register
          </Button>
        </form>
      </Form>
      {!!setFormType && (
        <div>
          <div className="flex items-center gap-x-3">
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => setFormType("login")}
              className="underline text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
