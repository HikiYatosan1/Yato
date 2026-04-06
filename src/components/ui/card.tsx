import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "cut-corner panel-outline rounded-[30px] border border-white/70 bg-white shadow-panel",
        className,
      )}
      {...props}
    />
  );
}
