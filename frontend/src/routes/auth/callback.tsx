import { createFileRoute } from "@tanstack/react-router";

import RedirectDiscordAuth from "@/components/discord-redirect";

export const Route = createFileRoute("/auth/callback")({
  component: DiscordAuthPage,
});

function DiscordAuthPage() {
  return <RedirectDiscordAuth />;
}
