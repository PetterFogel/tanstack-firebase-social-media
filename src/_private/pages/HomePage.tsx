import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetFollowingFeed } from "@/lib/react-query/queries";
import BookFeedList from "@/components/shared/BookFeedList";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const { data: bookFeed, isPending: isFeedLoading } = useGetFollowingFeed(
    currentUser?.id || ""
  );

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        <h2 className="text-3xl font-bold">Home</h2>
        {isFeedLoading ? (
          <div className="flex-center h-full">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookFeed && <BookFeedList bookFeed={bookFeed} />}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
