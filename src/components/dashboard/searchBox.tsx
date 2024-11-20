"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CircleX, Search } from "lucide-react";
import { forwardRef } from "react";

const SearchBox = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & { className?: string }
>(function SearchBox({ className, ...props }, ref) {
  return (
    <div className="relative">
      <Input ref={ref} className={cn("px-8", className)} {...props} />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground/80">
        <Search size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
});

SearchBox.displayName = "SearchBox";

export default SearchBox;
