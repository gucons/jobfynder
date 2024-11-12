"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserIcon,
} from "lucide-react";
import { User } from "next-auth";
import { useTheme } from "next-themes";

type Props = {
  user: User;
};

export default function UserAccountDropdown({ user }: Props) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="rounded-lg">
            <AvatarImage
              src={user.image || "https://github.com/shadcn.png"}
              alt="User"
            />
            <AvatarFallback className="rounded-lg border">U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <Avatar className="mr-3 h-10 w-10">
                <AvatarImage
                  src={user.image || "https://github.com/shadcn.png"}
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="mt-1 text-xs leading-none text-muted-foreground">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <div className="flex space-x-1">
              <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light mode</span>
              </Button>
              <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                <span className="sr-only">Dark mode</span>
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
