import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import SignOutButton from "./logoutButton";

const userMenuItems: {
    name: string;
    link: string;
}[] = [
    {
        name: "Profile",
        link: "/profile",
    },
    {
        name: "Settings",
        link: "/settings",
    },
];

async function UserMenu({ user }: { user: User }) {
    return (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src={user?.image as string} alt="@profileImg" />
                <AvatarFallback>
                    {user.name
                        ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                        : "User"}
                </AvatarFallback>
            </Avatar>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <h1 className="group text-md transition-all flex items-center gap-1 cursor-pointer line-clamp-1 text-nowrap">
                        {user.name ? user.name : "User"}
                        <ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
                    </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30 text-lg">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item, index) => (
                        <DropdownMenuItem key={index}>
                            <Link href={item.link}>{item.name}</Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default UserMenu;
