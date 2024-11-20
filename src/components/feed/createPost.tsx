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
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {/* <span className="w-full rounded-r-xl bg-accent">
            Share your thoughts...
          </span> */}
          <div className="space-y-2">
            <Label htmlFor="input-09">Input with start icon</Label>
            <div className="relative flex">
              <Input
                id="input-09"
                className="peer ps-9"
                placeholder="Email"
                type="email"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <AtSign size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </div>
          {/* <Input placeholder="Share your thoughts..." className="ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0" /> */}
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="ghost" className="text-blue-600">
            <Image className="mr-2 h-4 w-4" />
            Photo
          </Button>
          <Button variant="ghost" className="text-green-600">
            <Video className="mr-2 h-4 w-4" />
            Video
          </Button>
          <Button variant="ghost" className="text-yellow-600">
            <Calendar className="mr-2 h-4 w-4" />
            Event
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-purple-600">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>Create Poll</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ask Question</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
