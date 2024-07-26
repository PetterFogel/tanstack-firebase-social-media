import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import {
  useGetSpecificBook,
  useCheckIfBookExistInShelf,
} from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";
import { LoaderCircle, Image } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BookshelfButton from "@/components/shared/BookshelfButton";

const BookDetailsPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string | undefined }>();
  const { currentUser } = useAuthContext();

  const { data: bookExist } = useCheckIfBookExistInShelf(
    bookId || "",
    currentUser?.id || ""
  );

  const {
    data: book,
    error: getBookError,
    isPending: isFetchingBook,
  } = useGetSpecificBook(bookId || "");

  useEffect(() => {
    if (getBookError) {
      toast({ title: getBookError.message });
      navigate("/explore");
    }
  }, [getBookError, navigate]);

  if (isFetchingBook) {
    return (
      <div className="flex-center mt-32 w-full">
        <LoaderCircle className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto h-full md:py-8">
      {book && (
        <div className="bg-white md:shadow-md rounded-lg md:p-4 grid grid-cols-3 md:grid-cols-9 gap-4 lg:gap-8">
          <div className="col-span-3 md:col-span-2 h-full space-y-4">
            <div className="md:bg-white bg-slate-50 py-4 md:p-0">
              <div className="md:w-full w-2/5 m-auto ">
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex-center min-h-64 bg-neutral-300">
                    <Image className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white px-4 md:px-0">
              {book.id && currentUser?.id && (
                <BookshelfButton
                  bookExist={bookExist}
                  bookId={book.id}
                  userId={currentUser.id}
                />
              )}
            </div>
          </div>
          <div className="col-span-3 md:col-span-7 p-4 md:p-0 space-y-2 md:space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold">
              {book.volumeInfo.title}
            </h2>
            <h2 className="text-lg lg:text-xl font-medium text-gray-500">
              {book.volumeInfo.authors}
            </h2>
            <hr />
            <div className="space-x-4 flex">
              <h3 className="text-sm lg:text-sm font-medium text-gray-500">
                Published {book.volumeInfo.publishedDate}
              </h3>
              <h3 className="text-sm lg:text-sm font-medium text-gray-500">
                {book.volumeInfo.pageCount} pages
              </h3>
            </div>
            <p className="mt-2 text-xs lg:text-sm">
              {book.volumeInfo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
