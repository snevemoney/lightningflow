'use client';

export default function NodeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Node Health</h1>
      <p className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
        {error.message || 'Failed to load node stats'}
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
