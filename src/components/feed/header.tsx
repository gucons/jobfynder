// components/layout/Header.tsx
import {
  Bell,
  Check,
  Link2,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Logo from "@/constants/logo";
import IconInput from "../basic/iconInput";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <a className="flex items-center space-x-2" href="#">
            {/* <img
              src={"https://placehold.co/600x400"}
              width={600}
              height={400}
              alt="User"
              className="h-8 w-8 text-blue-600"
            /> */}
            <Logo width={40} height={40} />
            {/* <span className="text-xl font-bold text-blue-600">SocialPro</span> */}
          </a>
          {/* <div className="relative hidden sm:block"> */}
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[300px] bg-gray-100 pl-8"
            />
          </div> */}
          <IconInput startIcon={Search} placeholder="Search..." />
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost">Demo</Button>
          <Button variant="ghost">Pages</Button>
          <Button variant="ghost">Account</Button>
          <Button variant="ghost">My Network</Button>
          <Button variant="ghost" size="icon" className="relative">
            <Link2 className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0">
              5
            </Badge>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0">
                  2
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      John Doe wants to connect
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="outline">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Your post received 50 likes
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
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
        </nav>
      </div>
    </header>
  );
}
