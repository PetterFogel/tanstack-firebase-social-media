import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { IBook, ISearchedBooks } from "@/types/books";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSearchedBooks = async ({
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

export const getSpecificBook = async (bookId: string): Promise<IBook> => {
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

export const sortBooksByAddedDate = (books: IBook[]) =>
  books?.sort((a: IBook, b: IBook) => {
    return (
      new Date(b.addedAt.toDate()).getTime() -
      new Date(a.addedAt.toDate()).getTime()
    );
  });
