import { Timestamp } from "firebase/firestore";

export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
    pageCount: number;
    publisher: string;
    publishedDate: string;
  };
  userId: string;
  rating: number;
  addedAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ISearchedBooks {
  items: IBook[];
  totalItems: number;
  kind: string;
}

export interface IManageBook {
  bookId: string;
  userId: string;
}
