import { useGetUsers } from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";
import { LoaderCircle, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const PeoplePage = () => {
  const { currentUser } = useAuthContext();
  const { data: users, isPending: isUsersLoading } = useGetUsers();

  const filteredUsers = users?.filter((user) => user.id !== currentUser?.id);

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        <h2 className="text-3xl font-bold">People</h2>
        {isUsersLoading ? (
          <div className="flex-center h-full">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers?.map((user, idx) => (
              <div
                key={idx}
                className="flex gap-3 items-center flex-col bg-white shadow-md p-4 rounded-lg"
              >
                <Link
                  to={`/profile/${user.id}`}
                  className="flex-center flex-col"
                >
                  <div className="bg-green-400 rounded-full h-10 w-10 xl:h-14 xl:w-14 flex-center">
                    <UserRound size={30} />
                  </div>
                  <p className="font-bold text-sm xl:text-lg">{user.name}</p>
                </Link>
                <p className="text-xs xl:text-sm">@{user.username}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PeoplePage;
