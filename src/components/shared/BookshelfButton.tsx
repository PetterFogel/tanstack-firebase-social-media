import {
  useAddBookToShelf,
  useRemoveBookFromShelf,
} from "@/lib/react-query/mutations";
import { Button } from "../ui/button";
import { Album, BookCheck, LoaderCircle } from "lucide-react";
import { IBook } from "@/types/books";

interface Props {
  bookExist: boolean | undefined;
  book: IBook;
  userId: string;
}

const BookshelfButton = ({ bookExist, book, userId }: Props) => {
  const { mutateAsync: addBookToShelf, isPending: isAdding } =
    useAddBookToShelf();

  const { mutateAsync: removeBookFromShelf, isPending: isRemoving } =
    useRemoveBookFromShelf();

  const addBookToShelfHandler = () => {
    if (!book.id || !userId) return;
    addBookToShelf({ book, userId });
  };

  const removeBookHandler = async () => {
    if (!book.id || !userId) return;
    removeBookFromShelf({ bookId: book.id, userId });
  };

  return (
    <>
      {bookExist ? (
        <Button
          variant="outline"
          className="w-full text-xs"
          onClick={removeBookHandler}
          disabled={isRemoving}
        >
          {isRemoving ? (
            <LoaderCircle className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <BookCheck className="w-4 h-4 mr-2 xl:flex md:hidden xs:flex" />
              In bookshelf
            </>
          )}
        </Button>
      ) : (
        <Button
          className="w-full text-xs"
          onClick={addBookToShelfHandler}
          disabled={isAdding}
        >
          {isAdding ? (
            <LoaderCircle className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Album className="w-4 h-4 mr-2 xl:flex md:hidden xs:flex" />
              <p className="">Add to bookshelf</p>
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default BookshelfButton;
