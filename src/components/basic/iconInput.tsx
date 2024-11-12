import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const Icon = icon;

    return (
      <div
        className={cn(
          "my-1 flex items-center space-x-2 rounded-md border border-input px-3 py-2 text-foreground focus-within:ring-2 focus-within:ring-blue-500",
          className
        )}
      >
        {Icon && <Icon size={16} className="size-4" />}
        <Input
          ref={ref}
          className="h-fit border-0 border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          {...props}
        />
      </div>
    );
  }
);
IconInput.displayName = "Input";

export default IconInput;
