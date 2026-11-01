import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border border-border bg-surface-2 px-3 text-sm text-foreground placeholder:text-muted transition focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_0_1px_var(--primary)]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
