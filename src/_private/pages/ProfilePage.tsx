import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useGetSpecificUserFeed } from "@/lib/react-query/queries";
import BookwallList from "@/components/shared/BookwallList";

const ProfilePage = () => {
  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { data, isFetching: isBooksLoading } = useGetSpecificUserFeed(
    userId || ""
  );

  const getUserName = () => {
    if (currentUser?.id === userId) return "Your";
    const user = data?.find((user) => user.userId === userId);
    return user?.username;
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        <h2
          className={`text-3xl font-bold ${
            isBooksLoading && "text-transparent"
          }`}
        >
          {getUserName()} Profile
        </h2>
        {isBooksLoading ? (
          <div className="flex-center h-full">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data && <BookwallList bookFeed={data} />}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
