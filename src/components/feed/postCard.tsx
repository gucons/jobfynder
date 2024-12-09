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
  MehIcon,
  MoreHorizontal,
  UserMinus,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import Activity from "./postActions";

export interface PostCardProps {
  author: {
    name: string;
    // TODO: Add title to author in future
    // title: string;
    image: string | null;
  };
  updatedAt: Date;
  content: string;
  media: string[];
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  updatedAt,
  content,
  media,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4">
            <Avatar className="size-10 ring-2 ring-primary/10">
              <AvatarImage src={author?.image as string} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="m-0 text-base font-medium tracking-tight hover:text-primary">
                {author.name}
              </h3>
              <p className="m-0 text-xs text-muted-foreground">
                {/* // TODO: Add title to author in future */}
                {"Software Engineer"} • {updatedAt.toDateString()}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/80"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
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
                <span>Unfollow {author.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>Report post</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mt-4 leading-relaxed text-gray-700">{content}</p>
        <div className="mt-4 overflow-hidden rounded-xl bg-secondary/10">
          {media && media.length > 0 && (
            <Image
              src={`https://utfs.io/f/${media[0]}`}
              width={600}
              height={300}
              alt="Post image"
              className="w-full object-cover"
            />
          )}
        </div>
        <div className="mt-6 flex items-center justify-start border-t pt-4">
          <Activity
            className="space-x-8"
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
