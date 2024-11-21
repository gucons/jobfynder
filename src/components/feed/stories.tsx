// components/feed/Stories.tsx
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const stories = [
  { name: "Judy Nguyen", image: "https://placehold.co/100x100" },
  { name: "Billy Vasquez", image: "https://placehold.co/100x100" },
  { name: "Amanda Reed", image: "https://placehold.co/100x100" },
  { name: "Lori Smith", image: "https://placehold.co/100x100" },
  { name: "John Doe", image: "https://placehold.co/100x100" },
  { name: "Jane Smith", image: "https://placehold.co/100x100" },
];

export default function Stories() {
  return (
    <Card>
      <CardContent className="px-3 pt-4">
        <ScrollArea className="w-full whitespace-nowrap pb-3">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex h-40 w-28 flex-shrink-0 flex-col items-center justify-center rounded-lg border-dashed"
            >
              <Plus className="mb-2 h-8 w-8" />
              <span className="text-xs">Add Story</span>
            </Button>
            {stories.map((story, index) => (
              <div
                key={index}
                className="relative h-40 w-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                  <p className="text-xs text-white">{story.name}</p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
