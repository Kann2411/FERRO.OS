import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em]",
  {
    variants: {
      tone: {
        muted: "bg-white/5 text-secondary",
        accent: "bg-primary/15 text-primary",
        signal: "bg-signal/15 text-signal",
      },
    },
    defaultVariants: {
      tone: "muted",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
