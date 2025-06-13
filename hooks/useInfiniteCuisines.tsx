import { API_KEY, BASE_URL_FOOD } from "@/lib/constants";
import { SearchRecipe } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface QueryResponse {
  results: SearchRecipe[];
  totalResults: number;
}

const useInfiniteCuisines = (name: string) => {
  return useInfiniteQuery<QueryResponse>({
    queryKey: ["cuisines", name],
    queryFn: async ({ pageParam = 1 }) => {
      const offset = ((pageParam as number) - 1) * 20;
      const response = await fetch(
        `${BASE_URL_FOOD}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${name}&number=20&offset=${offset}`
      );
      if (!response.ok) throw new Error("Network error");
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedItems = allPages.length * 20;
      return fetchedItems < lastPage.totalResults
        ? allPages.length + 1
        : undefined;
    },
    staleTime: 60000,
  });
};
export default useInfiniteCuisines;
