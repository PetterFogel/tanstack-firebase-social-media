import { Image, UserRound } from "lucide-react";
import { IBook } from "@/types/books";
import { LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useGetUserBookshelf } from "@/lib/react-query/queries";
import { sortBooksByAddedDate } from "@/lib/utils";

const ProfilePage = () => {
  const { userId } = useParams();
  const { currentUser } = useAuthContext();
  const { data: bookshelf, isFetching: isBooksLoading } = useGetUserBookshelf(
    userId || ""
  );

  const sortedBooksbyDate = sortBooksByAddedDate(bookshelf?.books);
  const isCurrentUser = currentUser?.id === bookshelf?.user?.id;
  const username = bookshelf?.user?.username;

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        <h2
          className={`text-3xl font-bold ${
            isBooksLoading && "text-transparent"
          }`}
        >
          {isCurrentUser ? "Your" : `${username}'s`} Profile
        </h2>
        {isBooksLoading ? (
          <div className="flex-center h-full">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sortedBooksbyDate?.map((item: IBook, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-md shadow-md md:p-4 px-2 py-3 flex gap-4"
              >
                <div>
                  {currentUser && (
                    <Link to={`/profile/${currentUser.id}`}>
                      <div className="bg-green-400 rounded-full h-8 w-8 flex-center">
                        <UserRound size={16} />
                      </div>
                    </Link>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  {isCurrentUser ? (
                    <h3 className="text-xs md:text-base">
                      You have added{" "}
                      <span className="font-bold">{item.volumeInfo.title}</span>{" "}
                      to your shelf
                    </h3>
                  ) : (
                    <h3 className="text-xs md:text-sm">
                      <span className="font-bold">{username}</span> has added{" "}
                      <span className="font-bold">{item.volumeInfo.title}</span>{" "}
                      to the shelf
                    </h3>
                  )}
                  <div className="w-1/5">
                    <Link to={`/book/${item.id}`}>
                      {item.volumeInfo.imageLinks?.thumbnail ? (
                        <img
                          src={item.volumeInfo.imageLinks.thumbnail}
                          alt={item.volumeInfo.title}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
