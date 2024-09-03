import { QUERY_KEYS } from "./queryKeys";
import { useMutation } from "@tanstack/react-query";
import { INewUser, IUser } from "@/types/user";
import { getSearchedBooks } from "../utils";
import { IBook, IManageBook } from "@/types/books";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  removeBookFromUserShelf,
  addBookToUserShelf,
  createUserAccount,
  signInAccount,
  unfollowUser,
  followUser,
  updateBookRating,
} from "../firebase/firebase.utils";

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

export const useAddBookToUserShelf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ book, user }: { book: IBook; user: IUser }) =>
      addBookToUserShelf(book, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_EXISTS_IN_SHELF],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_BOOK_SHELF],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_REVIEW],
      });
    },
  });
};

export const useRemoveBookFromUserShelf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, userId }: IManageBook) =>
      removeBookFromUserShelf(bookId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_EXISTS_IN_SHELF],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_BOOK_SHELF],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_REVIEW],
      });
    },
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      currentUserId,
      userId,
    }: {
      currentUserId: string;
      userId: string;
    }) => followUser(currentUserId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.IS_USER_FOLLOWING],
      });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      currentUserId,
      userId,
    }: {
      currentUserId: string;
      userId: string;
    }) => unfollowUser(currentUserId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.IS_USER_FOLLOWING],
      });
    },
  });
};

export const useUpdateBookRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookId,
      userId,
      rating,
    }: {
      bookId: string;
      userId: string;
      rating: number;
    }) => updateBookRating(bookId, userId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BOOK_REVIEW],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SPECIFIC_BOOK],
      });
    },
  });
};
