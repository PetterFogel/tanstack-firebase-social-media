import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getSearchedBooks } from "../utils";
import { INewUser } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import {
  addBookToUserBookShelf,
  createUserAccount,
  removeBookFromShelf,
  signInAccount,
} from "../firebase/firebase.utils";
import { QUERY_KEYS } from "./queryKeys";
import { IBook, IManageBook } from "@/types/books";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });
};

export const useSearchBooks = (searchQuery: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCHED_BOOKS, searchQuery],
    queryFn: getSearchedBooks,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length * 10;

      return lastPage.totalItems > nextPage ? nextPage : undefined;
    },
    enabled: !!searchQuery,
    initialPageParam: 0,
  });
};

export const useAddBookToShelf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ book, userId }: { book: IBook; userId: string }) =>
      addBookToUserBookShelf(book, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_EXISTS_IN_SHELF],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_BOOK_SHELF],
      });
    },
  });
};

export const useRemoveBookFromShelf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, userId }: IManageBook) =>
      removeBookFromShelf(bookId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_EXISTS_IN_SHELF],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_BOOK_SHELF],
      });
    },
  });
};
