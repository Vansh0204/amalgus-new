export default function ProductSkeleton() {
  return (
    <div className="glass-card rounded-[32px] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-100"></div>
      <div className="p-8 space-y-4">
        <div className="h-6 bg-gray-100 rounded-full w-2/3"></div>
        <div className="h-3 bg-gray-50 rounded-full w-1/3"></div>
        <div className="h-12 bg-gray-50 rounded-2xl w-full"></div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <div className="space-y-2">
            <div className="h-2 bg-gray-50 rounded-full w-12"></div>
            <div className="h-6 bg-gray-100 rounded-full w-20"></div>
          </div>
          <div className="h-10 bg-gray-100 rounded-xl w-24"></div>
        </div>
      </div>
    </div>
  );
}
