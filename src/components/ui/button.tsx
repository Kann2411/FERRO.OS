"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--primary)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-surface-strong text-foreground hover:bg-surface-3",
        ghost: "bg-transparent text-foreground hover:bg-white/5",
        outline: "border border-border bg-transparent text-foreground hover:border-border-strong hover:bg-white/5",
        signal: "bg-signal text-signal-foreground hover:bg-signal/90",
      },
      size: {
        default: "h-10 rounded-full px-4 text-sm",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-12 rounded-full px-6 text-base",
        icon: "h-10 w-10 rounded-full",
        pill: "h-7 rounded-full px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
