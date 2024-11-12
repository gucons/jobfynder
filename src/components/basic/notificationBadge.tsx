import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type Props = {
  notificationCount: number;
  Icon: LucideIcon;
};

function NotificationBadge({ notificationCount, Icon }: Props) {
  return (
    <Button variant="ghost" size="icon" className="relative border text-center">
      <Icon className="h-5 w-5" />
      <Badge
        variant="default"
        className="absolute -right-2 -top-1 h-5 px-1.5 text-center"
      >
        {notificationCount}
      </Badge>
    </Button>
  );
}

export default NotificationBadge;
