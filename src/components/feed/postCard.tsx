"use client";

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
  AlertCircle,
  Bookmark,
  EyeOff,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  ThumbsUp,
  UserMinus,
} from "lucide-react";
import * as React from "react";
import ActionButton from "./actionButton";
import Activity from "./postActions";

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
            <Avatar className="size-12">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="m-0 text-base font-semibold">{user.name}</h3>
              <p className="m-0 text-sm text-gray-500">
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
        <div className="justify mt-4 flex items-center justify-start">
          {/* <div className="flex">
            <ActionButton reposted={false} reposts={0} onRepost={() => {}} />
            <Button variant="ghost" size={"sm"} className="text-blue-600">
              <ThumbsUp className="mr-1 h-4 w-4" />
              Like
            </Button>
            <Button variant="ghost" size={"sm"}>
              <MessageCircle className="mr-1 h-4 w-4" />
              Comment
            </Button>
            <Button variant="ghost" size={"sm"}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Button variant="ghost" size={"sm"}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button> */}
          <Activity
            className="space-x-6"
            likes={0}
            reposts={0}
            views={100}
            bookmarks={0}
            liked={false}
            reposted={false}
            bookmarked={false}
            onLike={() => {}}
            onBookmark={() => {}}
            onRepost={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
