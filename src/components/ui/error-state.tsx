"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ message = "Something went wrong", onRetry, className = "" }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center ${className}`} role="alert">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-2xl text-error" aria-hidden="true">
        !
      </div>
      <p className="mt-4 text-sm font-medium text-white">{message}</p>
      <p className="mt-2 text-sm text-secondary">
        FERRO CORE is working to restore this module.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          Try again
        </button>
      )}
    </div>
  );
}
