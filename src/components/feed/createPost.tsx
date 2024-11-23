"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ImageIcon, SmileIcon, Users2 } from "lucide-react";
import { useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Submitting post:", content);
    setContent("");
    setIsLoading(false);
  };

  return (
    <Card className="select-none shadow-none">
      <CardContent className="p-0 px-4 py-3 flex items-center justify-center">
        <Dialog>
          <DialogTrigger className="w-full p-0">
        <div className="flex w-full h-full items-center justify-center gap-4">
          <Avatar className="size-11">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="flex h-11 w-full cursor-pointer items-center rounded-xl border bg-accent px-4 font-medium transition-all duration-200 hover:bg-accent/80 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-[0.99]">
            What&apos;s on your mind?
          </span>
        </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Create post
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <Avatar className="size-10 ring-2 ring-primary/10">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="font-semibold">John Doe</span>
          </div>

          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[150px] resize-none rounded-xl border-none bg-accent/5 p-4 text-lg leading-relaxed focus-visible:ring-1 focus-visible:ring-primary/20"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Card className="border-dashed border-primary/20 bg-card/50">
            <CardContent className="grid grid-cols-3 gap-2 p-4">
          {[
            { icon: ImageIcon, label: "Photo/Video" },
            { icon: Users2, label: "Tag People" },
            { icon: SmileIcon, label: "Feeling" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex space-x-2 transition-all duration-200 hover:bg-primary/10"
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Button>
          ))}
            </CardContent>
          </Card>

          <Button
            className={cn(
          "w-full bg-gradient-to-r from-primary to-primary/90 text-white transition-all duration-300",
          "hover:from-primary/90 hover:to-primary hover:shadow-md",
          "disabled:from-gray-400 disabled:to-gray-400"
            )}
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
