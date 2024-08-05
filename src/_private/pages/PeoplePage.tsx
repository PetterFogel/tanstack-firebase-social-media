import { useGetUsers } from "@/lib/react-query/queries";
import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import UserItem from "@/components/shared/UserListItem";
import { IUser } from "@/types/user";

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
            {currentUser &&
              filteredUsers?.map((user: IUser, idx) => (
                <UserItem
                  currentUserId={currentUser.id}
                  user={user}
                  key={idx}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PeoplePage;
