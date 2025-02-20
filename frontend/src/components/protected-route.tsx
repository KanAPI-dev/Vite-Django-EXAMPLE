import { Navigate, useLocation } from "@tanstack/react-router";

import { useAuthStore } from "@/lib/store";

/**
 * This file will act as a catch-all redirect handler.
 * This is essentially how I've handled this functionality
 * in other projects, but there are other ways to handle this.
 * I may look into using tanstack router's method. I can probably
 * use this method for redirecting a user to the page they were
 * trying to reach before they were logged in:
 * https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#redirecting
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const protectedRoutes = ["/dashboard"];

  // Redirect user away from the login page if they are already logged in
  if (user && location.pathname.startsWith("/auth")) {
    return <Navigate to="/dashboard/settings" />;
  }
  // Redirect user to the login page if they are not logged in and trying to
  // access a auth-only route
  else if (
    !user &&
    protectedRoutes.some((route) => location.pathname.startsWith(route))
  ) {
    return <Navigate to="/auth" />;
  }

  return children;
}

export default ProtectedRoute;
