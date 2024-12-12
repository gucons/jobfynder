import { getSessionServer } from "@/server/auth";
import { Session } from "next-auth";
import Link from "next/link";
import Logo from "../brand/logo";
import NotificationPanel from "../feed/notificationPanel";
import SearchBox from "../feed/searchBox";
import UserDropdown from "../feed/userPanel";

export default async function MainHeader() {
  const session = (await getSessionServer()) as Session;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <nav className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="flex items-center space-x-2">
            <Logo width={100} height={100} className="size-10" />
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
