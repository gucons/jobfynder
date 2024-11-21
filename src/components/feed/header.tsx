// import BrandLogo from "@/constants/logo";
import { getSessionServer } from "@/lib/auth";
import { BarChart, LucideIcon, MessageCircle, Users } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import NotificationBadge from "../base/notificationBadge";
import NotificationPanel from "./notificationPanel";
import SearchBox from "./searchBox";
import UserDropdown from "./userPanel";

const navItems: Array<{
  icon: LucideIcon;
  badgeCount: number;
}> = [
  { icon: Users, badgeCount: 3 },
  { icon: MessageCircle, badgeCount: 5 },
];

export default async function FeedHeader() {
  const session = (await getSessionServer()) as Session;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <nav className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="flex items-center space-x-2">
            {/* <BrandLogo width={100} height={100} className="size-12" /> */}
            <BarChart className="size-6" />
          </Link>

          <SearchBox
            placeholder="Search..."
            type="search"
            aria-label="Search"
          />
        </div>
        <div className="flex items-center space-x-6">
          {/* // Notification Panel */}
          <NotificationPanel />

 

          {/* // User Dropdown */}
          <UserDropdown user={session.user} />
        </div>
      </nav>
    </header>
  );
}
