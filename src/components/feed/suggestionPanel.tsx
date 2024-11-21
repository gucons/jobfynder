import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Link2, UserPlus } from "lucide-react";
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
    image:
      "https://images.pexels.com/photos/15263136/pexels-photo-15263136/free-photo-of-head-of-a-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followed: false,
  },
  {
    name: "Lori Ferguson",
    title: "Web Developer",
    image:
      "https://images.pexels.com/photos/15263136/pexels-photo-15263136/free-photo-of-head-of-a-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followed: true,
  },
  {
    name: "Samuel Bishop",
    title: "News anchor",
    image:
      "https://images.pexels.com/photos/15263136/pexels-photo-15263136/free-photo-of-head-of-a-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followed: false,
  },
  {
    name: "Dennis Barrett",
    title: "Web Developer",
    image:
      "https://images.pexels.com/photos/15263136/pexels-photo-15263136/free-photo-of-head-of-a-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followed: false,
  },
  {
    name: "Judy Nguyen",
    title: "News anchor",
    image:
      "https://images.pexels.com/photos/15263136/pexels-photo-15263136/free-photo-of-head-of-a-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    followed: false,
  },
];

export default function SuggestionsPanel() {
  return (
    <div className="col-span-3 hidden space-y-6 justify-self-end md:block">
      {/* Who to follow */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="px-4 pt-3">
          <h3 className="text-center text-xl font-semibold">
            Suggested Connections
          </h3>
        </div>
        <div className="p-4 pt-3">
          {suggestedUsers.map((user, index) => (
            <div
              key={index}
              className="group mb-2 flex cursor-default items-center justify-between rounded-lg p-2 ring-1 ring-transparent transition-colors last:mb-0 hover:ring-border"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    className="object-cover object-center"
                    src={user.image}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">{user.name}</h4>
                  <p className="text-xs text-muted-foreground">{user.title}</p>
                </div>
              </div>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={user.followed ? "ghost" : "secondary"}
                      size="sm"
                      className="h-8 w-8"
                      aria-label={user.followed ? "Following" : "Follow"}
                    >
                      {user.followed ? (
                        <Check size={14} strokeWidth={2.5} />
                      ) : (
                        <UserPlus size={14} strokeWidth={2.5} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {user.followed ? "Following" : "Follow"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}

          <Button
            className="mt-2 w-full justify-between text-sm font-medium hover:bg-muted"
            variant="secondary"
          >
            Show more
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>

      {/* Today's news */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="px-4 pt-3">
          <h3 className="text-xl font-semibold">Today's news</h3>
        </div>
        <div className="p-4 pt-3">
          <div className="space-y-4">
            {[
              {
                title: "Ten questions you should answer truthfully",
                time: "2hr",
              },
              {
                title: "Five unbelievable facts about money",
                time: "3hr",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <h4 className="font-medium leading-snug">{item.title}</h4>
                <p className="mt-1 flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{item.time}</span>
                  <Link2 className="h-3 w-3" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
