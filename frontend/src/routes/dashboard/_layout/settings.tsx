import { createFileRoute } from "@tanstack/react-router";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { /*getAuthConfig*/ getAuthStatus } from "@/api/endpoints";

export const Route = createFileRoute("/dashboard/_layout/settings")({
  component: RouteComponent,
  loader: () => getAuthStatus(),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  // console.log(data.data);

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <SidebarTrigger />
        <h1 className="text-2xl">Dashboard Settings</h1>
      </div>

      <div>
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      </div>
    </div>
  );
}
