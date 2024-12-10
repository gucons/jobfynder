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
import { formatDistanceToNowStrict } from "date-fns";
import {
  AlertCircle,
  Bookmark,
  EyeOff,
  MoreHorizontal,
  UserMinus,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import Activity from "./postActions";

export interface PostCardProps {
  postId: string;
  author: {
    name: string;
    image: string | null;
  };
  updatedAt: Date;
  content: string;
  media: string[];
  likeCount: number;
  isLiked: boolean;
}

const MediaGrid: React.FC<{ media: string[] }> = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div
      className={`mt-4 grid gap-1 overflow-hidden rounded-xl ${
        media.length === 1
          ? "grid-cols-1"
          : media.length === 2
            ? "grid-cols-2"
            : media.length === 3
              ? "grid-cols-2"
              : "grid-cols-2"
      }`}
    >
      {media.map((imageId, index) => {
        // For 3 images, make first image full width
        const isFirstInThree = media.length === 3 && index === 0;
        // Only show first 4 images
        if (index >= 4) return null;

        return (
          <div
            key={imageId}
            className={`relative ${isFirstInThree ? "col-span-2" : ""} ${media.length > 1 ? "aspect-square" : "aspect-video"}`}
          >
            <Image
              src={`https://utfs.io/f/${imageId}`}
              fill
              alt={`Post image ${index + 1}`}
              className="object-cover"
            />
            {/* Show count of remaining images */}
            {index === 3 && media.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xl font-bold text-white">
                +{media.length - 4}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({
  postId,
  author,
  updatedAt,
  content,
  media,
  likeCount: initialLikeCount,
  isLiked: initialIsLiked,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    try {
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (!res.ok) throw new Error("Failed to like post");

      const { liked } = await res.json();
      setIsLiked(liked);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

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
                {"Software Engineer"} •{" "}
                {formatDistanceToNowStrict(updatedAt, { addSuffix: true })}
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
        <MediaGrid media={media} />
        <div className="mt-2 flex items-center justify-start border-t pt-4">
          <Activity
            className="space-x-8"
            likes={likeCount}
            reposts={0}
            // views={100}
            bookmarks={0}
            liked={isLiked}
            reposted={false}
            bookmarked={false}
            onLike={handleLike}
            onBookmark={() => {}}
            onRepost={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
