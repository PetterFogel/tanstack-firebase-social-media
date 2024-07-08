import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchedBooks } from "../utils";

import { INewUser } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../firebase/firebase.utils";
import { QUERY_KEYS } from "./queryKeys";

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
    queryFn: fetchSearchedBooks,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length * 10;

      return lastPage.totalItems > nextPage ? nextPage : undefined;
    },
    enabled: !!searchQuery,
    initialPageParam: 0,
  });
};
