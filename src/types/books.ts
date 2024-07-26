export interface ISearchedBook {
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
}

export interface ISearchedBooks {
  items: ISearchedBook[];
  totalItems: number;
  kind: string;
}

export interface IManageBook {
  bookId: string;
  userId: string;
}
