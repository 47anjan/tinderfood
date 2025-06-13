import { API_KEY, BASE_URL_FOOD } from "@/lib/constants";
import { SearchRecipe } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface QueryResponse {
  results: SearchRecipe[];
  totalResults: number;
}

interface SearchProps {
  query?: string;
}

const useInfiniteSearch = ({ query }: SearchProps) => {
  return useInfiniteQuery<QueryResponse>({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1 }) => {
      const offset = ((pageParam as number) - 1) * 20;

      const response = await fetch(
        `${BASE_URL_FOOD}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20&offset=${offset}`
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
    enabled: !!query,
    staleTime: 60000,
  });
};

export default useInfiniteSearch;
