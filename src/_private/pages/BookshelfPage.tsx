import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetUserBookshelf } from "@/lib/react-query/queries";
import GridBookList from "@/components/shared/GridBookList";
import PageWrapper from "@/components/shared/PageWrapper";

const BookshelfPage = () => {
  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { data: bookshelf, isPending: isBooksLoading } = useGetUserBookshelf(
    userId || currentUser?.id
  );

  const username =
    bookshelf?.user.id === currentUser?.id
      ? "Your"
      : `${bookshelf?.user.name}s`;

  return (
    <>
      {isBooksLoading ? (
        <div className="flex-center h-full">
          <LoaderCircle className="h-16 w-16 animate-spin" />
        </div>
      ) : (
        <PageWrapper pageTitle={`${username} Bookshelf`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <GridBookList books={bookshelf?.books || []} />
          </div>
        </PageWrapper>
      )}
    </>
  );
};

export default BookshelfPage;
