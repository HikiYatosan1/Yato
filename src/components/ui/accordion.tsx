import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = ({
  className,
  ...props
}: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn(
      "cut-corner-sm overflow-hidden rounded-[26px] border border-avanta-navy/10 bg-white shadow-panel",
      className,
    )}
    {...props}
  />
);

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-avanta-navy transition hover:text-avanta-emerald",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 text-avanta-green transition duration-300 group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content className={cn("overflow-hidden text-sm text-avanta-graphite", className)} {...props}>
    <div className="px-5 pb-5 pt-0 leading-7">{children}</div>
  </AccordionPrimitive.Content>
);
