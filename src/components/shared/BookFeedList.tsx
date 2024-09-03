import { Link } from "react-router-dom";
import { IBookFeed } from "@/types/books";
import { useAuthContext } from "@/context/AuthContext";
import { Image, Star, UserRound } from "lucide-react";
import { getTimeAgoHandler, sortBooksByAddedDate } from "@/lib/utils";

interface Props {
  bookFeed: IBookFeed[];
}

const BookFeedList = ({ bookFeed }: Props) => {
  const { currentUser } = useAuthContext();

  const sortedBooksbyDate = sortBooksByAddedDate(bookFeed);

  const displayUserName = (userId: string) => {
    if (currentUser?.id === userId) return <span>You</span>;

    const user = bookFeed.find((user) => user.userId === userId);
    return <span className="font-bold">{user?.username || "Someone"}</span>;
  };

  return (
    <>
      {sortedBooksbyDate?.map((item, idx: number) => (
        <div
          key={idx}
          className="bg-white rounded-md shadow md:p-4 px-2 py-3 flex gap-2 md:gap-4"
        >
          <div>
            {currentUser && (
              <Link to={`/profile/${item.userId}`}>
                <div className="bg-green-400 rounded-full h-8 w-8 flex-center">
                  <UserRound size={16} />
                </div>
              </Link>
            )}
          </div>
          <div className="space-y-2 w-full">
            {item.actionStatus === "ratingAdded" ? (
              <h3 className="text-sm md:text-base flex items-center gap-1">
                {displayUserName(item.userId)} rated{" "}
                <span className="font-bold">{item.bookTitle}</span>{" "}
                <span>
                  <div className="flex">
                    {Array.from({ length: item.rating }, (_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="#e87400"
                        className="text-yellow-500"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </span>
              </h3>
            ) : (
              <h3 className="text-sm md:text-base">
                {displayUserName(item.userId)} added{" "}
                <span className="font-bold">{item.bookTitle}</span> to the shelf
              </h3>
            )}
            <div className="w-2/6 sm:w-1/5">
              <Link to={`/book/${item.bookId}`}>
                {item.imageLinks?.thumbnail ? (
                  <img
                    src={item.imageLinks.thumbnail}
                    alt={item.bookTitle}
                    className="w-full h-auto object-cover flex-grow"
                  />
                ) : (
                  <div className="w-full flex-center flex-grow min-h-64 bg-neutral-300">
                    <Image className="h-8 w-8" />
                  </div>
                )}
              </Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-sm font-medium text-gray-500">
              {getTimeAgoHandler(item.updatedAt)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookFeedList;
