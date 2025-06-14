import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <section className="max-w-[1036px] mx-auto px-4 py-8">
      <div className="mt-8 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full rounded-2xl h-[208px]" />
            </div>
          ))}
      </div>
    </section>
  );
};
export default LoadingPage;
