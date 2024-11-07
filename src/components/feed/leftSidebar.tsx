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

export default function LeftSidebar() {
  return (
    <div className="col-span-3">
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src="https://placehold.co/200x300"
              alt="Cover"
              className="h-32 w-full object-cover"
            />
            <Avatar className="absolute -bottom-6 left-4 h-14 w-14 border-4 border-white">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Sam Lanson"
              />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
          </div>
          <div className="px-4 pt-6 text-center">
            <h2 className="text-xl font-bold">Sam Lanson</h2>
            <p className="text-sm font-semibold text-gray-600">
              Web Developer at Webestica
            </p>
            <p className="mt-2 font-mono text-sm font-normal text-gray-600">
              I'd love to change the world, but they won't give me the source
              code.
            </p>
            <Separator className="my-4" />
            <div className="mt-4 flex h-10 items-center justify-between space-x-4 text-sm">
              <div className="text-center">
                <div className="font-bold">256</div>
                <div className="text-xs text-gray-600">Post</div>
              </div>
              <Separator orientation="vertical" />
              <div className="text-center">
                <div className="font-bold">2.5K</div>
                <div className="text-xs text-gray-600">Followers</div>
              </div>
              <Separator orientation="vertical" />
              <div className="text-center">
                <div className="font-bold">365</div>
                <div className="text-xs text-gray-600">Following</div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <nav className="px-2">
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
