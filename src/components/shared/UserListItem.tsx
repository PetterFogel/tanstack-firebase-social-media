import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IUser } from "@/types/user";
import { LoaderCircle, UserRound } from "lucide-react";
import { useCheckIfUserIsFollowing } from "@/lib/react-query/queries";
import { useFollowUser, useUnfollowUser } from "@/lib/react-query/mutations";

interface Props {
  currentUserId: string;
  user: IUser;
}

const UserItem = ({ currentUserId, user }: Props) => {
  const { data: isFollowing } = useCheckIfUserIsFollowing(
    currentUserId,
    user.id
  );

  const { mutate: followUser, isPending: isFollowingUser } = useFollowUser();

  const { mutate: unfollowUser, isPending: isUnfollowingUser } =
    useUnfollowUser();

  const followUserHandler = () =>
    followUser({ currentUserId, userId: user.id });

  const unfollowUserHandler = () =>
    unfollowUser({ currentUserId, userId: user.id });

  return (
    <div className="flex items-center flex-col bg-white shadow-md p-4 rounded-lg gap-4">
      <div className="flex-center flex-col ">
        <Link to={`/profile/${user.id}`} className="flex-center flex-col">
          <div className="bg-green-400 rounded-full h-10 w-10 xl:h-14 xl:w-14 flex-center">
            <UserRound size={30} />
          </div>
          <p className="font-bold text-sm xl:text-lg">{user.name}</p>
        </Link>
        <p className="text-xs xl:text-sm">@{user.username}</p>
      </div>
      {!isFollowing ? (
        <Button onClick={followUserHandler} disabled={isFollowingUser}>
          {isFollowingUser ? (
            <LoaderCircle className="w-6 h-6 animate-spin" />
          ) : (
            "Follow"
          )}
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={isUnfollowingUser}
          onClick={unfollowUserHandler}
        >
          {isUnfollowingUser ? (
            <LoaderCircle className="w-6 h-6 animate-spin" />
          ) : (
            "Unfollow"
          )}
        </Button>
      )}
    </div>
  );
};

export default UserItem;
