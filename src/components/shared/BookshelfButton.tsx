import { IUser } from "@/types/user";
import { IBook } from "@/types/books";
import { Button } from "../ui/button";
import { Album, BookCheck, LoaderCircle } from "lucide-react";
import {
  useAddBookToUserShelf,
  useRemoveBookFromUserShelf,
} from "@/lib/react-query/mutations";

interface Props {
  bookExist: boolean | undefined;
  book: IBook;
  user: IUser;
}

const BookshelfButton = ({ bookExist, book, user }: Props) => {
  const { mutateAsync: addBookToShelf, isPending: isAdding } =
    useAddBookToUserShelf();

  const { mutateAsync: removeBookFromShelf, isPending: isRemoving } =
    useRemoveBookFromUserShelf();

  const addBookToShelfHandler = () => {
    addBookToShelf({ book, user });
  };

  const removeBookHandler = async () => {
    removeBookFromShelf({ bookId: book.id, userId: user.id });
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
