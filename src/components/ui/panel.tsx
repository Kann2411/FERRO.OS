import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const panelVariants = cva("border border-border", {
  variants: {
    tone: {
      surface: "bg-surface/80",
      raised: "bg-surface-3/90",
      subtle: "bg-white/5",
      sunken: "bg-black/25",
    },
    size: {
      sm: "rounded-2xl p-3",
      md: "rounded-3xl p-4",
      lg: "rounded-3xl p-5",
    },
    elevated: {
      true: "shadow-window backdrop-blur-xl",
      false: "",
    },
  },
  defaultVariants: {
    tone: "surface",
    size: "md",
    elevated: false,
  },
});

export interface PanelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}

export function Panel({ className, tone, size, elevated, ...props }: PanelProps) {
  return (
    <div className={cn(panelVariants({ tone, size, elevated }), className)} {...props} />
  );
}
