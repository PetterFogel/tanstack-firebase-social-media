import { useQuery } from "@tanstack/react-query";
import { fetchSpecificBook } from "../utils";
import { QUERY_KEYS } from "./queryKeys";

export const useGetSpecificBook = (bookId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SPECIFIC_BOOK, bookId],
    queryFn: () => fetchSpecificBook(bookId),
    enabled: !!bookId,
  });
};
