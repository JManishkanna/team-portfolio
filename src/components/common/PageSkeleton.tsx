/** Shown while a lazily loaded route chunk arrives. */
export function PageSkeleton() {
  return (
    <div className="shell flex min-h-[70vh] flex-col justify-center gap-5 py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="h-3 w-32 animate-pulse rounded-full bg-mist" />
      <div className="h-14 w-[min(100%,42rem)] animate-pulse rounded-2xl bg-mist" />
      <div className="h-5 w-[min(100%,28rem)] animate-pulse rounded-full bg-mist" />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="h-40 animate-pulse rounded-2xl bg-mist" />
        <div className="h-40 animate-pulse rounded-2xl bg-mist [animation-delay:120ms]" />
        <div className="h-40 animate-pulse rounded-2xl bg-mist [animation-delay:240ms]" />
      </div>
    </div>
  );
}
