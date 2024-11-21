import CreatePost from "@/components/feed/createPost";
import PostCard from "@/components/feed/postCard";
import { Separator } from "@/components/ui/separator";
import { posts } from "@/data/posts";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        <CreatePost />
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
            Recent Posts
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
