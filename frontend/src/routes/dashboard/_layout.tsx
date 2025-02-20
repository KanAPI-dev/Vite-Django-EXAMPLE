import { createFileRoute, Outlet } from "@tanstack/react-router";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import ProtectedRoute from "@/components/protected-route";

/**
 * How do layouts work with the router?
 * https://github.com/TanStack/router/discussions/987#discussioncomment-8892531
 *
 * I used Pixelycia's "Option 2". May need to look back into this if there turns
 * out to be any sort of issue with navigation.
 *
 * I tried making sense of layout routing by examining these:
 *
 * - https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#pathless-routes
 * - https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#mixed-flat-and-directory-routes
 * - https://tanstack.com/router/latest/docs/framework/react/examples/basic-file-based
 *   - (Only works on chromium based browsers)
 *
 * Along with other external searches and videos, but nothing was clear on
 * how to achieve this until I ran into rahiparikh's github discussion that
 * Pixelycia gave the solution to.
 */
export const Route = createFileRoute("/dashboard/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <DashboardSidebar />
        <main className="container pt-5 pb-40">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
