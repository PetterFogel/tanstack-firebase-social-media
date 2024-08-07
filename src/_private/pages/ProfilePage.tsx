import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useGetSpecificUserFeed } from "@/lib/react-query/queries";
import BookFeedList from "@/components/shared/BookFeedList";
import ProfileStats from "@/components/shared/ProfileStats";

const ProfilePage = () => {
  const { userId } = useParams();
  const { data, isFetching: isFeedLoading } = useGetSpecificUserFeed(
    userId || ""
  );

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        {isFeedLoading ? (
          <div className="flex-center p-16">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <>
            {data && (
              <ProfileStats user={data.user} isFeedLoading={isFeedLoading} />
            )}
            <div className="grid grid-cols-1 gap-4">
              {data && <BookFeedList bookFeed={data.bookFeed} />}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
