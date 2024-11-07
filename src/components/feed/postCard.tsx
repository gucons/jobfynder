import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  Bookmark,
  EyeOff,
  UserMinus,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  user: {
    name: string;
    title: string;
    image: string;
  };
  time: string;
  content: string;
  postImage: string;
}

const PostCard: React.FC<PostCardProps> = ({
  user,
  time,
  content,
  postImage,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">
                {user.title} • {time}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Bookmark</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EyeOff className="mr-2 h-4 w-4" />
                <span>Hide post</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserMinus className="mr-2 h-4 w-4" />
                <span>Unfollow {user.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>Report post</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mt-4">{content}</p>
        <img
          src={postImage}
          width={600}
          height={300}
          alt="Post image"
          className="mt-4 w-full rounded-lg object-contain"
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <Button variant="ghost" className="text-blue-600">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="ghost">
              <MessageCircle className="mr-2 h-4 w-4" />
              Comment
            </Button>
            <Button variant="ghost">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Button variant="ghost">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
