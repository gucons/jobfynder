"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Cake, X } from "lucide-react";
import * as React from "react";
import { CardFooter } from "react-bootstrap";
import NotificationBadge from "../basic/notificationBadge";

export default function NotificationPanel() {
  const [notifications, setNotifications] = React.useState([
    // Sample notifications based on schema
    {
      id: 1,
      type: "friend_request",
      message: "sent you a friend request.",
      user: { name: "Judy Nguyen", avatar: "https://github.com/shadcn.png", initials: "JN" },
      timeAgo: "1 min",
      actions: ["accept", "delete"],
    },
    {
      id: 2,
      type: "birthday",
      message: "a happy birthday (Nov 12)",
      user: { name: "Amanda Reed", avatar: "/placeholder.svg", initials: "AR" },
      timeAgo: "1 min",
      action: "Say happy birthday 🎂",
    },
    // Additional notifications...
  ]);

  const clearAll = () => {
    setNotifications([]);
  };

  const handleAction = (notificationId: number, action: string) => {
    if (action === "delete") {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NotificationBadge
          notificationCount={notifications.length}
          Icon={Bell}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <Card className="border-0 border-none p-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between bg-accent px-4 py-2">
            <h2 className="text-lg font-semibold">Notifications</h2>
            {notifications.length > 0 && (
              <Button
                variant="destructive"
                size={"sm"}
                className="h-auto px-2 py-1.5 shadow-none"
                onClick={clearAll}
              >
                Clear all
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] py-2 pl-1 pr-3 grid grid-cols-1 gap-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 rounded-lg px-2 py-3 hover:bg-gray-100"
                >
                  <Avatar className="h-10 w-10">
                    {notification.type === "birthday" ? (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-pink-100">
                        <Cake className="h-5 w-5 text-pink-500" />
                      </div>
                    ) : (
                      <>
                        <AvatarImage
                          src={notification.user.avatar}
                          alt={notification.user.name}
                        />
                        <AvatarFallback>
                          {notification.user.initials}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">
                        {notification.user.name}
                      </span>{" "}
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{notification.timeAgo}</span>
                      {notification.actions?.includes("accept") && (
                        <Button
                          size="sm"
                          className="h-6 rounded-md bg-blue-500 px-2 text-white hover:bg-blue-600"
                          onClick={() =>
                            handleAction(notification.id, "accept")
                          }
                        >
                          Accept
                        </Button>
                      )}
                      {notification.actions?.includes("delete") && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 rounded-md px-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() =>
                            handleAction(notification.id, "delete")
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex items-center justify-center p-2 bg-accent">
            <Button variant="outline" className="shadow-none hover:bg-background">
              See all notifications
            </Button>
          </CardFooter>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
