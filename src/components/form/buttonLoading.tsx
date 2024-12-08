import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

const ButtonLoading = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { loading: boolean; loaderText?: string; staticText?: string }
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loaderText = "Loading",
      staticText = "Submit",
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={cn("w-full", className)}
        ref={ref}
        {...props}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader className="mr-2 size-4 animate-spin" />
            {loaderText}
          </span>
        ) : (
          staticText
        )}
      </Button>
    );
  }
);

ButtonLoading.displayName = "ButtonLoading";

export default ButtonLoading;
