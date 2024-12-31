export default function JobCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="animate-pulse">
        {/* Title */}
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>

        {/* Company and Location */}
        <div className="mt-4 space-y-3">
          <div className="h-3 w-1/2 rounded bg-gray-200"></div>
          <div className="h-3 w-1/3 rounded bg-gray-200"></div>
        </div>

        {/* Description */}
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="h-2 w-4/5 rounded bg-gray-200"></div>
        </div>

        {/* Date */}
        <div className="mt-4 h-3 w-1/4 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
