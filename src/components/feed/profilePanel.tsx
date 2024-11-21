import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Calendar, Home, Settings, Users } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

const menuItems = [
  { icon: Home, label: "Feed" },
  { icon: Users, label: "Connections" },
  { icon: Bell, label: "Latest News" },
  { icon: Calendar, label: "Events" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

const userInfo = {
  name: "Sam Lanson",
  coverImage:
    "https://images.pexels.com/photos/29012161/pexels-photo-29012161/free-photo-of-colorful-canal-houses-in-amsterdam.jpeg",
  avatarImage: "https://github.com/shadcn.png",
  bio: "I'd love to change the world, but they won't give me the source code.",
  stats: [
    { label: "Posts", value: 256 },
    { label: "Followers", value: 2.5 },
    { label: "Following", value: 365 },
  ],
};

export default function ProfileSidebar() {
  return (
    <div className="col-span-3 hidden h-max rounded-lg border bg-card text-card-foreground shadow-sm md:block">
      <div className="relative rounded-t-lg">
        <Image
          src={userInfo.coverImage}
          height={300}
          width={200}
          alt="CoverPicture"
          className="h-28 w-full rounded-t-lg object-cover"
        />
        <Avatar className="absolute -bottom-6 left-4 h-14 w-14 border-4 border-white dark:border-gray-800">
          <AvatarImage src={userInfo.avatarImage} alt={userInfo.name} />
          <AvatarFallback>
            {userInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="px-4 pt-6 text-center">
        <p className="text-lg font-medium leading-none">{userInfo.name}</p>
        <p className="mt-2 max-w-sm px-3 text-sm font-normal text-gray-600 dark:text-gray-400">
          {userInfo.bio}
        </p>
        <Separator className="my-3" />
        <div className="mt-4 flex h-10 items-center justify-between space-x-4 px-4 text-sm">
          {userInfo.stats.map((stat, index) => (
            <Fragment key={stat.label}>
              <div className="text-center">
                <div className="font-medium text-blue-700 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
              {index < userInfo.stats.length - 1 && (
                <Separator orientation="vertical" className="my-4" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Separator className="my-3" />
      <nav className="px-2 pb-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start dark:text-gray-100"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
