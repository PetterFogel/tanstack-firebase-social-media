import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetFollowingFeed } from "@/lib/react-query/queries";
import BookFeedList from "@/components/shared/BookFeedList";
import PageWrapper from "@/components/shared/PageWrapper";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const { data: bookFeed, isPending: isFeedLoading } = useGetFollowingFeed(
    currentUser?.id || ""
  );

  return (
    <PageWrapper pageTitle="Home">
      {isFeedLoading ? (
        <div className="flex-center h-full">
          <LoaderCircle className="h-16 w-16 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookFeed && <BookFeedList bookFeed={bookFeed} />}
        </div>
      )}
    </PageWrapper>
  );
};

export default HomePage;
