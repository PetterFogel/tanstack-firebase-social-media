import {
  useAddBookToShelf,
  useRemoveBookFromShelf,
} from "@/lib/react-query/mutations";
import { Button } from "../ui/button";
import { Album, BookCheck, LoaderCircle } from "lucide-react";

interface Props {
  bookExist: boolean | undefined;
  bookId: string;
  userId: string;
}

const BookshelfButton = ({ bookExist, bookId, userId }: Props) => {
  const { mutateAsync: addBookToShelf, isPending: isAdding } =
    useAddBookToShelf();

  const { mutateAsync: removeBookFromShelf, isPending: isRemoving } =
    useRemoveBookFromShelf();

  const addBookToShelfHandler = () => {
    if (!bookId || !userId) return;
    addBookToShelf({ bookId, userId });
  };

  const removeBookHandler = async () => {
    if (!bookId || !userId) return;
    removeBookFromShelf({ bookId, userId });
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
