import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-avanta-navy/10 bg-white px-4 text-sm text-avanta-navy outline-none transition focus:border-avanta-green focus:ring-4 focus:ring-avanta-green/10",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
