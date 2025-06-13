import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <section className="max-w-[1036px] mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-8 w-1/2" />
      <Skeleton className="mb-8 h-[668px] rounded w-full" />
    </section>
  );
};
export default LoadingPage;
