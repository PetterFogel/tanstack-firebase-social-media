import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetUserBookshelf } from "@/lib/react-query/queries";
import GridBookList from "@/components/shared/GridBookList";
import PageWrapper from "@/components/shared/PageWrapper";

const BookshelfPage = () => {
  const { currentUser } = useAuthContext();
  const { data: books, isPending: isBooksLoading } = useGetUserBookshelf(
    currentUser?.id || ""
  );

  return (
    <PageWrapper pageTitle="Your Bookshelf">
      {isBooksLoading ? (
        <div className="flex-center h-full">
          <LoaderCircle className="h-16 w-16 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <GridBookList books={books || []} />
        </div>
      )}
    </PageWrapper>
  );
};

export default BookshelfPage;
