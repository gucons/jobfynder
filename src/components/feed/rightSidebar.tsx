// components/layout/RightSidebar.tsx
import { ArrowRight, Check, Link2, Plus, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const suggestedUsers = [
  {
    name: "Frances Guerrero",
    title: "News anchor",
    image: "/placeholder.svg?height=40&width=40",
    followed: false,
  },
  {
    name: "Lori Ferguson",
    title: "Web Developer",
    image: "/placeholder.svg?height=40&width=40",
    followed: true,
  },
  {
    name: "Samuel Bishop",
    title: "News anchor",
    image: "/placeholder.svg?height=40&width=40",
    followed: false,
  },
  {
    name: "Dennis Barrett",
    title: "Web Developer",
    image: "/placeholder.svg?height=40&width=40",
    followed: false,
  },
  {
    name: "Judy Nguyen",
    title: "News anchor",
    image: "/placeholder.svg?height=40&width=40",
    followed: false,
  },
];

export default function RightSidebar() {
  return (
    <div className="col-span-3 space-y-6">
      {/* Who to follow */}
      <Card>
        <CardHeader>
          <CardTitle className="mb-0">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          {suggestedUsers.map((user, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between last:mb-0"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="m-0 text-base font-semibold">{user.name}</h4>
                  <p className="m-0 text-sm text-gray-500">{user.title}</p>
                </div>
              </div>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Follow">
                      <Plus size={10} strokeWidth={2} aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                    Follow
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}

          <Button
            className="group h-auto w-auto bg-popover"
            variant={"secondary"}
          >
            <span className="text-sm">Show more</span>
            <ArrowRight
              className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </CardContent>
      </Card>

      {/* Today&apos;s news */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s news</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">
                Ten questions you should answer truthfully
              </h4>
              <p className="text-sm text-gray-500">
                2hr • <Link2 className="inline-block h-4 w-4" />
              </p>
            </div>
            <div>
              <h4 className="font-semibold">
                Five unbelievable facts about money
              </h4>
              <p className="text-sm text-gray-500">
                3hr • <Link2 className="inline-block h-4 w-4" />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
