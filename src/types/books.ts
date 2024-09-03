import { FieldValue, Timestamp } from "firebase/firestore";

export interface IBook {
  id: string;
  volumeInfo: IBookVolumeInfo;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export interface IBookVolumeInfo {
  id?: string;
  title: string;
  authors: string[];
  categories: string[];
  description: string;
  imageLinks?: IBookImageLinks;
  pageCount: number;
  publisher: string;
  publishedDate: string;
}

export interface IBookImageLinks {
  thumbnail: string;
  smallThumbnail: string;
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

export interface IBookShelf {
  bookIds: string[];
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface IBookFeed {
  userId: string;
  username: string;
  bookId: string | undefined;
  bookTitle: string;
  imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
  actionStatus: string;
  rating: number;
  reviewStatus: string;
  reviewText: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
