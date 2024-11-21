import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React, { createElement } from "react";
import { Input } from "../ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", className)}>
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2.5">
          {icon && createElement(icon, { size: 16, className: "size-4" })}
        </div>
        <Input ref={ref} className="px-10" {...props} />
      </div>
    );
  }
);

IconInput.displayName = "Input";

export default IconInput;
