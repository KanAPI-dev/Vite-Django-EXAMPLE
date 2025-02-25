import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import ProtectedRoute from "@/components/protected-route";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [formType, setFormType] = useState<
    "login" | "register" | "forgot_password"
  >("login");

  return (
    <ProtectedRoute>
      <div className="container pt-10 pb-40 flex justify-center">
        {formType === "register" ? (
          <RegisterForm setFormType={setFormType} />
        ) : formType === "forgot_password" ? (
          <ForgotPasswordForm setFormType={setFormType} />
        ) : (
          <LoginForm setFormType={setFormType} />
        )}
      </div>
    </ProtectedRoute>
  );
}
