import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { ISearchedBook, ISearchedBooks } from "@/types/books";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchSearchedBooks = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}): Promise<ISearchedBooks> => {
  const [_, searchQuery] = queryKey;

  const url = `${
    import.meta.env.VITE_GOOGLE_BOOKS_API_URL
  }/books/v1/volumes?q=${encodeURIComponent(
    searchQuery
  )}&startIndex=${pageParam}&maxResults=10&key=${
    import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
  }`;

  const response = await fetch(url);
  return response.json();
};

export const fetchSpecificBook = async (
  bookId: string
): Promise<ISearchedBook> => {
  const url = `${
    import.meta.env.VITE_GOOGLE_BOOKS_API_URL
  }/books/v1/volumes/${bookId}?key=${
    import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Book was not found.");
  }
  return response.json();
};
