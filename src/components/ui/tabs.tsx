import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({
  className,
  ...props
}: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex flex-wrap gap-2 rounded-[24px] border border-avanta-navy/10 bg-white/90 p-2 shadow-panel",
      className,
    )}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "rounded-full px-4 py-2 text-sm font-semibold text-avanta-graphite transition data-[state=active]:bg-avanta-gradient data-[state=active]:text-white data-[state=active]:shadow-float",
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={cn("mt-8 outline-none", className)} {...props} />
);
