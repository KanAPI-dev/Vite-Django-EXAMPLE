import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";

import { useAuthStore } from "@/lib/store";
import { logout } from "@/api/endpoints";

import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.logout);

  return (
    <header>
      <div className="container flex justify-between py-4">
        <Link to="/" className="text-2xl font-semibold">
          Django+React
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/dashboard">Dashboard</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-x-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="fill-accent-foreground" strokeWidth={0} />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="secondary"
                    onClick={() => logout().catch(() => clearUser())}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Login</Link>
            </Button>
          )}

          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
