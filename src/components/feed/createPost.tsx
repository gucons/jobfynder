// components/feed/CreatePost.tsx
import {
  Image,
  Video,
  Calendar,
  MoreHorizontal,
  MessageCircle,
  HelpCircle,
  AtSign,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";

export default function CreatePost() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="flex h-12 w-full cursor-pointer items-center rounded-xl bg-accent px-4 font-medium">
            What's on your mind?
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
