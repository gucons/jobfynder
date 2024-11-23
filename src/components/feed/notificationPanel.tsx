"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Cake, Check, X } from "lucide-react";
import * as React from "react";
import { Badge } from "../ui/badge";

export default function NotificationPanel() {
  const [notifications, setNotifications] = React.useState([
    // Sample notifications based on schema
    {
      id: 1,
      type: "friend_request",
      message: "sent you a friend request.",
      user: {
        name: "Judy Nguyen",
        avatar: "https://github.com/shadcn.png",
        initials: "JN",
      },
      timeAgo: "1 min",
      actions: ["accept", "delete"],
    },
    {
      id: 2,
      type: "birthday",
      prefix: "Wish",
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
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative border text-center"
        >
          <Bell />
          <Badge
            variant="destructive"
            className="absolute -right-2 -top-1 h-4 px-1.5 text-center text-xs tabular-nums"
          >
            {notifications.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-88 p-0" align="end">
        <div className="flex flex-row items-center justify-between bg-accent px-4 py-2 text-accent-foreground">
          <span className="flex items-center gap-3">
            <h2 className="text-lg font-medium">Notifications</h2>
            {notifications.length > 0 && (
              <span className="select-none items-center text-nowrap rounded-sm border border-red-200 bg-red-100/30 px-2.5 py-1 text-xs font-normal tabular-nums text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {notifications.length} New
              </span>
            )}
          </span>
        </div>

        <div className="p-0">
          <ScrollArea className="h-[300px]">
            {notifications.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 border-b p-4 last:border-0"
                >
                  <Avatar className="h-9 w-9">
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
                    <p className="text-sm">
                      <span className="font-medium">
                        {notification.user.name}
                      </span>{" "}
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {notification.timeAgo}
                      </p>
                      <div className="flex space-x-2">
                        {notification.actions?.includes("accept") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() =>
                              handleAction(notification.id, "accept")
                            }
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Accept</span>
                          </Button>
                        )}
                        {notification.actions?.includes("delete") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() =>
                              handleAction(notification.id, "delete")
                            }
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </div>
        <div className="flex items-center justify-center bg-accent p-2">
          <Button variant="outline" className="shadow-none hover:bg-background">
            See all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
