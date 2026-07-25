"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SkeletonProps {
  lines?: number;
  className?: string;
}

const widths = ["75%", "60%", "85%", "70%", "65%", "80%", "55%", "90%"];

export function Skeleton({ lines = 3, className = "" }: SkeletonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true" role="presentation">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded bg-white/10 ${prefersReducedMotion ? "" : "animate-pulse"}`}
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${className}`} aria-hidden="true" role="presentation">
      <div className={`h-6 w-1/3 rounded bg-white/10 ${prefersReducedMotion ? "" : "animate-pulse"}`} />
      <div className={`mt-3 h-4 w-2/3 rounded bg-white/10 ${prefersReducedMotion ? "" : "animate-pulse"}`} />
      <div className={`mt-2 h-4 w-1/2 rounded bg-white/10 ${prefersReducedMotion ? "" : "animate-pulse"}`} />
      <div className="mt-4 flex gap-2">
        <div className={`h-6 w-16 rounded-full bg-white/10 ${prefersReducedMotion ? "" : "animate-pulse"}`} />
        <div className={`h-6 w-20 rounded-full bg-white/10 ${prefersReducedMotion ? "" : "animate-pulse"}`} />
      </div>
    </div>
  );
}

interface SkeletonListProps {
  count?: number;
  className?: string;
}

export function SkeletonList({ count = 3, className = "" }: SkeletonListProps) {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true" role="presentation">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
