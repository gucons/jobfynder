import Logo from "@/constants/logo";
import { getSessionServer } from "@/lib/auth";
import { AtSign, LucideIcon, MessageCircle, Search, Users } from "lucide-react";
import Link from "next/link";
import IconInput from "../basic/iconInput";
import NotificationBadge from "../basic/notificationBadge";
import NotificationPanel from "./notificationPanel";
import UserDropdown from "./userPanel";
import { Session } from "next-auth";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import SearchBox from "../dashboard/searchBox";

const navItems: Array<{
  icon: LucideIcon;
  badgeCount: number;
}> = [
  { icon: Users, badgeCount: 3 },
  { icon: MessageCircle, badgeCount: 5 },
];

export default async function Header() {
  const session = (await getSessionServer()) as Session;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <nav className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="flex items-center space-x-2">
            <Logo width={100} height={100} className="size-12" />
          </Link>

          <SearchBox
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
          <UserDropdown user={session.user} />
        </div>
      </nav>
    </header>
  );
}
