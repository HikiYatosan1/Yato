import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanta-green/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-avanta-green text-white shadow-float hover:-translate-y-0.5 hover:bg-avanta-emerald active:translate-y-0",
        secondary:
          "border-avanta-navy/10 bg-white text-avanta-navy hover:-translate-y-0.5 hover:border-avanta-green/20 hover:text-avanta-green",
        ghost:
          "border-transparent bg-transparent text-avanta-navy hover:bg-avanta-navy/5",
        outline:
          "border-avanta-navy/15 bg-avanta-mist text-avanta-navy hover:border-avanta-emerald hover:bg-white active:-translate-y-0 active:border-avanta-green/28 active:bg-[linear-gradient(135deg,rgba(58,170,53,0.16),rgba(255,255,255,0.98))] active:text-avanta-emerald active:shadow-[0_16px_28px_-22px_rgba(58,170,53,0.52)]",
        teal:
          "border-transparent bg-avanta-teal text-white hover:-translate-y-0.5 hover:bg-avanta-navy",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-[52px] px-6 text-base",
        sm: "h-9 px-4 text-sm",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
