import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetUserBookshelf } from "@/lib/react-query/queries";
import { sortBooksByAddedDate } from "@/lib/utils";
import GridBookList from "@/components/shared/GridBookList";

const BookshelfPage = () => {
  const { currentUser } = useAuthContext();
  const { data: bookshelf, isPending: isBooksLoading } = useGetUserBookshelf(
    currentUser?.id || ""
  );

  const sortedBooksbyDate = sortBooksByAddedDate(bookshelf?.books);

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        <h2 className="text-3xl font-bold">Your Bookshelf</h2>
        {isBooksLoading ? (
          <div className="flex-center h-full">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <GridBookList books={sortedBooksbyDate || []} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookshelfPage;
