"use client";

import CuisinesHeader from "./_components/cuisines-header";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import useInfiniteCuisines from "@/hooks/useInfiniteCuisines";
import CuisineCard from "./_components/CuisineCard";
import Header from "@/components/home/Header";

const CuisinesPage = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCuisines(country || "indian");

  const allRecipes = data?.pages.flatMap((page) => page.results) || [];

  if ((data && "code" in data && data.code === 402) || isError) {
    return (
      <div className="max-w-[1036px] mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center">
          <Image src="/empty.avif" width={271} height={256} alt="" />
          <h5 className="mt-6 font-semibold text-[#535665]">
            Your daily points limit of 150 has been reached.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="max-w-[1036px] mx-auto px-4 py-8">
        <CuisinesHeader />

        <div className="mt-8 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <>
              {Array(8)
                .fill("")
                .map((_, index) => (
                  <div key={index}>
                    <Skeleton className="w-full rounded-2xl h-[208px]" />
                  </div>
                ))}
            </>
          ) : (
            <>
              {allRecipes.map((recipe) => (
                <CuisineCard key={recipe.id} recipe={recipe} />
              ))}
            </>
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="w-full cursor-pointer border-gray-300 max-w-72 h-12 hover:bg-orange-600 hover:text-white transition-colors duration-300 mx-auto"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default CuisinesPage;
