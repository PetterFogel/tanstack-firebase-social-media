import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useGetSpecificUserFeed } from "@/lib/react-query/queries";
import BookFeedList from "@/components/shared/BookFeedList";
import ProfileStats from "@/components/shared/ProfileStats";
import MedaData from "@/components/shared/MetaData";

const ProfilePage = () => {
  const { userId } = useParams();
  const { data, isFetching: isFeedLoading } = useGetSpecificUserFeed(
    userId || ""
  );

  if (isFeedLoading)
    return (
      <div className="flex-center p-16">
        <LoaderCircle className="h-16 w-16 animate-spin" />
      </div>
    );

  return (
    <>
      <MedaData title={`${data?.user.name}`} />
      <section className="w-full max-w-5xl mx-auto p-0 md:p-4 md:py-8 mb-10 md:space-y-4">
        {data && (
          <ProfileStats user={data.user} isFeedLoading={isFeedLoading} />
        )}
        <div className="grid grid-cols-1 gap-4 p-4 md:p-0">
          {data && <BookFeedList bookFeed={data.bookFeed} />}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
