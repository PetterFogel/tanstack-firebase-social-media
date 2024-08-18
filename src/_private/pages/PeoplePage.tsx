import { useGetUsers } from "@/lib/react-query/queries";
import { LoaderCircle } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import UserItem from "@/components/shared/UserListItem";
import { IUser } from "@/types/user";
import PageWrapper from "@/components/shared/PageWrapper";

const PeoplePage = () => {
  const { currentUser } = useAuthContext();
  const { data: users, isPending: isUsersLoading } = useGetUsers();

  const filteredUsers = users?.filter((user) => user.id !== currentUser?.id);

  return (
    <PageWrapper pageTitle="People">
      {isUsersLoading ? (
        <div className="flex-center h-full">
          <LoaderCircle className="h-16 w-16 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentUser &&
            filteredUsers?.map((user: IUser, idx) => (
              <UserItem currentUserId={currentUser.id} user={user} key={idx} />
            ))}
        </div>
      )}
    </PageWrapper>
  );
};

export default PeoplePage;
