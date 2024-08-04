import { useQuery } from "@tanstack/react-query";
import { getSpecificBook } from "../utils";
import { QUERY_KEYS } from "./queryKeys";
import {
  checkIfBookExistsInShelf,
  getUserBookshelfBooks,
} from "../firebase/firebase.utils";

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
    queryFn: () => checkIfBookExistsInShelf(bookId, userId),
    enabled: !!bookId && !!userId,
  });
};

export const useGetUserBookshelfBooks = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_BOOK_SHELF],
    queryFn: () => getUserBookshelfBooks(userId),
  });
};
