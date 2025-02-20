import { createFileRoute } from "@tanstack/react-router";

import { SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/dashboard/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <SidebarTrigger />
        <h1 className="text-2xl">Dashboard Home</h1>
      </div>
    </div>
  );
}
