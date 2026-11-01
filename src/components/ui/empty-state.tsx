"use client";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon = "◇", title = "Nothing here yet", message = "This area is being prepared.", action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-border bg-foreground/5 p-8 text-center ${className}`} role="status">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-2xl text-muted" aria-hidden="true">
        {icon}
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm text-secondary">{message}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
