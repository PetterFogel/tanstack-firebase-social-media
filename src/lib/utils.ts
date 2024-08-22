import { twMerge } from "tailwind-merge";
import { Timestamp } from "firebase/firestore";
import { type ClassValue, clsx } from "clsx";
import { IBook, IBookFeed, ISearchedBooks } from "@/types/books";

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

export const sortBooksByAddedDate = (books: IBookFeed[] | undefined) =>
  books?.sort((a: IBookFeed, b: IBookFeed) => {
    return (
      new Date(b.updatedAt.toDate()).getTime() -
      new Date(a.updatedAt.toDate()).getTime()
    );
  });

export const getTimeAgoHandler = (timestamp: Timestamp) => {
  const currentDate = new Date();

  const timestampsDate = timestamp.toDate();

  const diffInMs = currentDate.getTime() - timestampsDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;

  if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w`;
  }

  if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y`;
};
