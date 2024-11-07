// components/layout/RightSidebar.tsx
import { Check, Link2, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <CardTitle>Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
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
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.title}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant={user.followed ? "secondary" : "default"}
              >
                {user.followed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          ))}
          <Button variant="link" className="mt-4 w-full">
            View more
          </Button>
        </CardContent>
      </Card>

      {/* Today's news */}
      <Card>
        <CardHeader>
          <CardTitle>Today's news</CardTitle>
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
