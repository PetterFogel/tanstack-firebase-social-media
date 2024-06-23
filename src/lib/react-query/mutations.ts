import { ISearchedBooks } from "@/types/books";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useSearchBooks = (): UseMutationResult<
  ISearchedBooks,
  Error,
  string
> => {
  return useMutation<ISearchedBooks, Error, string>({
    mutationFn: async (searchQuery: string) => {
      const url = `${
        import.meta.env.VITE_GOOGLE_BOOKS_API_URL
      }/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&key=${
        import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
      }`;

      const response = await fetch(url);
      return response.json();
    },
  });
};
