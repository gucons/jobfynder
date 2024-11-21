// components/layout/LeftSidebar.tsx
import { Home, Users, Bell, Calendar, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: Home, label: "Feed" },
  { icon: Users, label: "Connections" },
  { icon: Bell, label: "Latest News" },
  { icon: Calendar, label: "Events" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

const profileStats = [
  { label: "Posts", value: 256 },
  { label: "Followers", value: 2.5 },
  { label: "Following", value: 365 },
];

export default function LeftSidebar() {
  return (
    <div className="col-span-3">
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src="https://placehold.co/200x300"
              alt="Cover"
              className="h-24 w-full object-cover"
            />
            <Avatar className="absolute -bottom-6 left-4 h-14 w-14 border-4 border-white">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Sam Lanson"
              />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
          </div>
          <div className="px-4 pt-3 text-center">
            <p className="text-lg font-medium leading-none">Sam Lanson</p>
            <p className="mt-2 max-w-sm px-3 text-sm font-normal text-gray-600">
              I&apos;d love to change the world, but they won&apos;t give me the
              source code.
            </p>
            <Separator className="my-3" />
            <div className="mt-4 flex h-10 items-center justify-between space-x-4 px-4 text-sm">
              {profileStats.map((stat, index) => (
                <>
                  <div key={index} className="text-center">
                    <div className="font-medium text-blue-700">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                  {index < profileStats.length - 1 && (
                    <Separator orientation="vertical" className="my-4" />
                  )}
                </>
              ))}
            </div>
          </div>
          <Separator className="my-3" />
          <nav className="px-2 pb-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
