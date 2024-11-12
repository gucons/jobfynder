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
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          {icon && createElement(icon, { size: 16, className: "size-4" })}
        </div>
        <Input
          ref={ref}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...props}
        />
      </div>
    );
  }
);

IconInput.displayName = "Input";

export default IconInput;
