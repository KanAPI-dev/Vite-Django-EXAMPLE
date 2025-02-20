import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { login } from "@/api/endpoints";
import { useAuthStore } from "@/lib/store";
import loginFormSchema, { LoginFormValues } from "./validations/login-form";

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

type LoginFormProps = {
  setFormType?: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forgot_password">
  >;
};

export default function LoginForm({ setFormType }: LoginFormProps) {
  const loginUser = useAuthStore((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // Login with AllAuth API
      const res = await login(values);
      // Add the user to the zustand store
      loginUser(res.data.user);
      toast.success("Welcome Back!");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDiscordLogin = async () => {
  //   window.location.href = `${
  //     import.meta.env.VITE_BACKEND_URL
  //   }/accounts/discord/login/`;
  // };

  return (
    <div className="max-w-xs w-full space-y-4">
      <h1 className="text-2xl">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>

          {/* 
          <button
            type="button"
            onClick={handleDiscordLogin}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Login with Discord
          </button>
        */}
        </form>
      </Form>
      {!!setFormType && (
        <div>
          <div className="flex items-center gap-x-3">
            <p>Need an account?</p>
            <button
              type="button"
              onClick={() => setFormType("register")}
              className="underline text-blue-400 hover:text-blue-500 cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
