import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function CreatePost() {
  return (
    <Card className="select-none transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-center space-x-4">
          <Avatar className="size-12 transition-transform duration-200 hover:scale-105">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="flex h-12 w-full cursor-pointer items-center rounded-xl bg-accent px-4 font-medium transition-all duration-200 hover:bg-accent/80 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-[0.99]">
            What's on your mind?
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
