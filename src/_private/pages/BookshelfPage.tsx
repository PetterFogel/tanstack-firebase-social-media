import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetUserBookshelfBooks } from "@/lib/react-query/queries";
import GridBookList from "@/components/shared/GridBookList";
import { sortBooksByAddedDate } from "@/lib/utils";

const BookshelfPage = () => {
  const { currentUser } = useAuthContext();
  const { data: books, isPending: isBooksLoading } = useGetUserBookshelfBooks(
    currentUser?.id || ""
  );

  const sortedBooksbyDate = sortBooksByAddedDate(books);

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
            <GridBookList books={sortedBooksbyDate} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookshelfPage;
