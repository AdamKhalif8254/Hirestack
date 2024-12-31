export default function JobCardSkeleton() {
  return (
    <div className="group relative flex min-h-[400px] transform flex-col overflow-hidden rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-all duration-300">
      <div className="card-content relative z-10 flex-grow animate-pulse space-y-4">
        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-gray-700"></div>

        {/* Company */}
        <div className="h-4 w-1/2 rounded bg-gray-700"></div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 rounded-full bg-yellow-400"></div>
          <div className="h-4 w-1/3 rounded bg-gray-700"></div>
        </div>

        {/* Site */}
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 rounded-full bg-purple-400"></div>
          <div className="h-4 w-1/4 rounded bg-gray-700"></div>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 rounded-full bg-green-400"></div>
          <div className="h-4 w-1/4 rounded bg-gray-700"></div>
        </div>

        {/* Description */}
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="h-2 w-4/5 rounded bg-gray-700"></div>
        </div>
      </div>
      <div className="relative z-10 mt-6">
        <div className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2">
          <span className="text-white">Apply Now</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
    </div>
  );
}
