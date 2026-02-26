export const MovieCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700">
      {/* shimmer эффект через градиент */}
      <div className="bg-sixe-[length:200%_100%] h-64 w-full animate-pulse bg-linear-to-r from-gray-700 via-gray-600 to-gray-700" />

      <div className="flex h-16 flex-col justify-between p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-linear-to-r from-gray-700 via-gray-600 to-gray-700" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-linear-to-r from-gray-700 via-gray-600 to-gray-700" />
      </div>
    </div>
  );
};
