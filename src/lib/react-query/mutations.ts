import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchedBooks } from "../utils";

export const useSearchBooks = (searchQuery: string) => {
  return useInfiniteQuery({
    queryKey: ["searchBooks", searchQuery],
    queryFn: fetchSearchedBooks,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length * 10;

      return lastPage.totalItems > nextPage ? nextPage : undefined;
    },
    enabled: !!searchQuery,
    initialPageParam: 0,
  });
};
