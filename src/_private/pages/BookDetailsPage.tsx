import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useGetSpecificBook } from "@/lib/react-query/queries";
import { LoaderCircle, Image } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetailsPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string | undefined }>();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useGetSpecificBook(bookId || "");

  useEffect(() => {
    if (isError) {
      toast({ title: error.message });
      navigate("/explore");
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return (
      <div className="flex-center mt-32 w-full">
        <LoaderCircle className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto h-full md:py-8">
      {book && (
        <div className="bg-white md:shadow-md rounded-lg md:p-4 grid grid-cols-3 md:grid-cols-9 gap-4 lg:gap-12">
          <div className="col-span-3 md:col-span-2 md:bg-white bg-slate-50 py-4 md:p-0">
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
          <div className="col-span-3 md:col-span-7 p-4 md:p-0 space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold">
              {book.volumeInfo.title}
            </h2>
            <h2 className="text-lg lg:text-xl font-medium text-gray-500">
              {book.volumeInfo.authors}
            </h2>
            <div className="space-x-4 flex">
              <h3 className="text-sm lg:text-base font-medium text-gray-500">
                {book.volumeInfo.publishedDate}
              </h3>
              <h3 className="text-sm lg:text-base font-medium text-gray-500">
                {book.volumeInfo.pageCount} pages
              </h3>
            </div>

            <p className="mt-2 text-sm">{book.volumeInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
