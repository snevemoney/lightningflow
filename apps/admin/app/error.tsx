'use client';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground">
        {error.message || 'Unexpected error'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
      >
        Retry
      </button>
    </div>
  );
}
