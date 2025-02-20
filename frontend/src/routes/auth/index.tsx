import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import ProtectedRoute from "@/components/protected-route";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";

export const Route = createFileRoute("/auth/")({
  component: AuthPage,
});

function AuthPage() {
  const [formType, setFormType] = useState<
    "login" | "register" | "forgot_password"
  >("login");

  return (
    <ProtectedRoute>
      <div className="container pt-10 pb-40 flex justify-center">
        {formType === "login" ? (
          <LoginForm setFormType={setFormType} />
        ) : formType === "register" ? (
          <RegisterForm setFormType={setFormType} />
        ) : (
          <div>TODO: Password Reset Form</div>
        )}
      </div>
    </ProtectedRoute>
  );
}
