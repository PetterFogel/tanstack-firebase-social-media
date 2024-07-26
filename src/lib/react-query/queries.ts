import { useQuery } from "@tanstack/react-query";
import { getSpecificBook } from "../utils";
import { QUERY_KEYS } from "./queryKeys";
import { checkIfBookExistInShelf } from "../firebase/firebase.utils";

export const useGetSpecificBook = (bookId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SPECIFIC_BOOK, bookId],
    queryFn: () => getSpecificBook(bookId),
    enabled: !!bookId,
  });
};

export const useCheckIfBookExistInShelf = (bookId: string, userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOK_EXISTS_IN_SHELF, userId, bookId],
    queryFn: () => checkIfBookExistInShelf(bookId, userId),
    enabled: !!bookId && !!userId,
  });
};
