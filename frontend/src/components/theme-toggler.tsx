import { use } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { ThemeProviderContext } from "@/context/theme-provider-context";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils/shadcn-utils";

/**
 * This toggler was built to be responsive and placed in the header.
 * On large screens, it would show a button group.
 * On small screens, it would show a single icon that displays a popup
 * for the other theme options.
 *
 * I'm currently putting this into the footer, so it makes sense for
 * the button group to always be visible. To make it responsive again,
 * modify the first div to have the classNames `"hidden sm:flex"`
 * and the `DropdownMenuTrigger`'s className to be `"sm:hidden"`.
 */
export function ThemeToggler() {
  const { setTheme, theme } = use(ThemeProviderContext);

  return (
    <>
      <div className="hidden">
        <Button
          size="icon"
          variant="outline"
          className={cn("rounded-r-none dark:border-slate-600", {
            "bg-secondary": theme === "light",
          })}
          onClick={() => setTheme("light")}
        >
          <Sun />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className={cn(
            "rounded-l-none rounded-r-none border-x-0 dark:border-slate-600",
            { "bg-secondary": theme === "dark" }
          )}
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className={cn("rounded-l-none dark:border-slate-600", {
            "bg-secondary": theme === "system",
          })}
          onClick={() => setTheme("system")}
        >
          <Monitor />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
