import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-2xl border border-avanta-navy/10 bg-white px-4 py-3 text-sm text-avanta-navy outline-none transition focus:border-avanta-green focus:ring-4 focus:ring-avanta-green/10",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
