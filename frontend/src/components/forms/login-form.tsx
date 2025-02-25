import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { login } from "@/api/endpoints";
import { useAuthStore } from "@/lib/store";
import loginFormSchema, { LoginFormValues } from "./validations/login-form";
import getCookie from "@/lib/utils/get-cookie";
import { PROVIDER_REDIRECT_URL } from "@/lib/constants";

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

/**
 * TODO:
 *
 * - Handle login errors sent from Django.
 */
export default function LoginForm({ setFormType }: LoginFormProps) {
  const loginUser = useAuthStore((state) => state.login);

  const discordFormRef = useRef<HTMLFormElement>(null);

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
      toast.error("Something went wrong!");
    }
  };

  const handleDiscordLogin = () => {
    discordFormRef.current?.submit();
  };

  return (
    <div className="max-w-xs w-full space-y-4">
      <h1 className="text-2xl">Login</h1>

      {/* Credentails Login */}
      <Form {...form}>
        <form
          id="credentials-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required_field">Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={form.formState.isSubmitting} />
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
                <FormLabel className="required_field">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
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
              Logging in...
            </Button>
          ) : (
            <Button
              type="submit"
              form="credentials-form"
              className="w-full cursor-pointer"
            >
              Login
            </Button>
          )}
        </form>
      </Form>

      <div className="grid grid-cols-1 grid-rows-1 items-center">
        <hr className="col-start-1 row-start-1 border-2" />
        <span className="col-start-1 row-start-1 text-center w-fit mx-auto px-2 self-center bg-background">
          OR
        </span>
      </div>

      {/* Discord Provider Login */}
      <div>
        <form
          id="discord-form"
          ref={discordFormRef}
          method="POST"
          action={`${import.meta.env.VITE_BACKEND_URL}${PROVIDER_REDIRECT_URL}`}
          style={{ display: "none" }}
        >
          <input type="hidden" name="provider" value="discord" />
          <input type="hidden" name="process" value="login" />
          <input
            type="hidden"
            name="callback_url"
            value={`${import.meta.env.VITE_FRONTEND_URL}/dashboard/settings`}
          />
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={getCookie("csrftoken") || ""}
          />
        </form>

        <button
          form="discord-form"
          onClick={handleDiscordLogin}
          className="flex items-center justify-center gap-x-3 p-2 bg-[#5865F2] text-white rounded-md w-full cursor-pointer"
        >
          {/* https://simpleicons.org/?q=discord */}
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white w-6 h-6"
          >
            <title>Discord</title>
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
          <span>Login with Discord</span>
        </button>
      </div>

      {!!setFormType && (
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 cursor-pointer"
            onClick={() => setFormType("register")}
          >
            Need an Account?
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 cursor-pointer"
            onClick={() => setFormType("forgot_password")}
          >
            Forgot Password?
          </Button>
        </div>
      )}
    </div>
  );
}
