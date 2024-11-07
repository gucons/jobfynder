// components/feed/CreatePost.tsx
import {
  Image,
  Video,
  Calendar,
  MoreHorizontal,
  MessageCircle,
  HelpCircle,
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

export default function CreatePost() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Input placeholder="Share your thoughts..." className="bg-gray-100" />
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
