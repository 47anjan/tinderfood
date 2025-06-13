"use client";

import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/ui/button";
import { menus } from "@/lib/constants";
import Image from "next/image";
import useInfiniteSearch from "@/hooks/useInfiniteSearch";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const HomeRecipes = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(menus[0]);

  const {
    isFetchingNextPage,
    fetchNextPage,
    isError,
    isLoading,
    data,
    hasNextPage,
  } = useInfiniteSearch({
    query: selectedCategory,
  });

  const allRecipes = data?.pages.flatMap((page) => page.results) || [];

  if ((data && "code" in data && data.code === 402) || isError) {
    return (
      <>
        <div className="max-w-[1036px] mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center">
            <Image src="/empty.avif" width={271} height={256} alt="" />
            <h5 className="mt-6 font-semibold text-[#535665]">
              Your daily points limit of 150 has been reached.
            </h5>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-[1400px] mx-auto pb-16 px-4">
        <section className="mt-6">
          <CategoryFilter
            categories={menus}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.id}`}
                    className="rounded-2xl group h-52 overflow-hidden relative isolate"
                  >
                    {recipe.image && (
                      <img
                        src={recipe?.image}
                        loading="lazy"
                        className="w-full will-change-transform h-[208px] md:group-hover:scale-105  group-hover:brightness-110  transition-all object-cover duration-300 "
                        width={400}
                        height={208}
                        alt=""
                      />
                    )}
                    <div
                      style={{
                        background:
                          "linear-gradient(rgba(27, 30, 36, 0) 0%, rgba(27, 30, 36,.5) 90%)",
                      }}
                      className="bg-gradient-to-b  object-cover left-0 right-0 bottom-0 px-2 pb-2 flex items-end z-10 h-20 absolute "
                    >
                      <h4 className="text-base leading-5  font-medium text-white line-clamp-2">
                        {recipe.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-16">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-400 cursor-pointer hover:bg-orange-200"
                // className="w-full max-w-72 h-12 hover:bg-orange-primary hover:text-white transition-colors duration-300 mx-auto"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomeRecipes;
