import { IUser } from "@/types/user";
import { UserRound } from "lucide-react";

interface Props {
  isFeedLoading: boolean;
  user: IUser;
}

const ProfileStats = ({ user, isFeedLoading }: Props) => {
  return (
    <div className="flex bg-white md:md:rounded-lg p-4 gap-4 rounded-none shadow-none md:shadow">
      <div className="bg-green-400 rounded-full h-10 w-10 xl:h-14 xl:w-14 flex-center">
        <UserRound size={30} />
      </div>
      <div className="flex flex-col gap-4 ">
        <div>
          <h2
            className={`text-2xl md:text-3xl font-bold ${
              isFeedLoading && "text-transparent"
            }`}
          >
            {user.name}
          </h2>
          <p className="text-sm">@{user.username}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <p>
            <span className="font-bold">{user.bookIds.length}</span> Books
          </p>
          <p>
            <span className="font-bold"> {user.followers.length}</span>{" "}
            Followers
          </p>
          <p>
            <span className="font-bold">{user.following.length}</span> Following
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
