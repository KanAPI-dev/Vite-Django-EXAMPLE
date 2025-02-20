import { useEffect, useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Loader2 } from "lucide-react";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/lib/store";
import { getAuthStatus } from "@/api/endpoints";

export const Route = createRootRoute({
  component: RootRouteComponent,
});

function RootRouteComponent() {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const login = useAuthStore((state) => state.login);

  /**
   * This useEffect handles setting the user to the zustand store
   * if one has been found based on the response of the `getAuthStatus()`
   * API request.
   */
  useEffect(() => {
    console.log("Page refreshed. Fetching user...");
    getAuthStatus()
      .then((res) => {
        if (res.data.user) {
          console.log("Found a user");
          login(res.data.user);
        } else {
          console.log("No user");
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [login]);

  return (
    <>
      <ThemeProvider>
        <SidebarProvider>
          {/* May change to below div to be a grid layout */}
          <div className="flex flex-col min-h-svh w-full">
            <Header />
            {/* <div className="flex-1"> */}
            {isLoadingUser ? (
              <div className="flex flex-col items-center gap-3 mt-5 mb-10">
                <p className="text-xl">Starting up...</p>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Outlet />
            )}
            {/* </div> */}
          </div>
          <Toaster />
          <TanStackRouterDevtools />
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
