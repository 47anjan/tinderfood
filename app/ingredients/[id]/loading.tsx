import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Skeleton className="w-full h-[316px] mb-8" />

      <Skeleton className="w-[200px] h-[22px] mb-8" />

      <div>
        <Skeleton className="w-1/2 h-[24px] mb-2" />
        <Skeleton className="w-1/2 h-[20px] mb-1" />
        <Skeleton className="w-1/2 h-[20px] mb-1" />
        <Skeleton className="w-1/2 h-[20px] mb-1" />
        <Skeleton className="w-1/2 h-[20px] mb-1" />
        <Skeleton className="w-1/2 h-[20px] mb-1" />
        <Skeleton className="w-1/2 h-[20px] mb-1" />
      </div>
    </div>
  );
};
export default LoadingPage;
