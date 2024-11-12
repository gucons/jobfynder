// components/layout/Header.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/constants/logo";
import {
  LogOut,
  LucideIcon,
  MessageCircle,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import IconInput from "../basic/iconInput";
import NotificationBadge from "../basic/notificationBadge";
import NotificationPanel from "./notificationPanel";

const navItems: Array<{
  icon: LucideIcon;
  badgeCount: number;
}> = [
  { icon: Users, badgeCount: 3 },
  { icon: MessageCircle, badgeCount: 5 },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <nav className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="flex items-center space-x-2">
            <Logo width={100} height={100} className="size-12" />
          </Link>

          <IconInput
            icon={Search}
            placeholder="Search..."
            type="search"
            aria-label="Search"
          />
        </div>
        <div className="flex items-center space-x-6">
          {/* // Nav Items */}
          <div className="space-x-4">
            {navItems.map((item, index) => (
              <NotificationBadge
                key={index}
                Icon={item.icon}
                notificationCount={item.badgeCount}
              />
            ))}

            {/* // Notifications */}
            <NotificationPanel />
          </div>

          {/* // User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="rounded-lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="rounded-lg border">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
