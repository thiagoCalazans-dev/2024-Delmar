"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { DoorOpen, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navlinks";
import { cn } from "@/lib/cn";
import { signOut } from "@/actions/auth";

export function DesktopSidebar() {
  const pathName = usePathname();

  function onSignoutClick() {
    signOut();
  }

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {navLinks.map((link) => {
            const isActive =
              pathName.startsWith(link.href) && link.href !== "/";
            const isHome = "/" === link.href;

            return (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex p-2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ",
                      isHome
                        ? "rounded-full bg-primary text-lg font-semibold text-primary-foreground  md:text-base hover:text-muted-foreground"
                        : "",
                      isActive
                        ? "flex items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"
                        : ""
                    )}
                  >
                    {link.icon}
                    <span className="sr-only capitalize">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onSignoutClick}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <DoorOpen className="h-5 w-5" />
                <span className="sr-only">Sign Out</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
