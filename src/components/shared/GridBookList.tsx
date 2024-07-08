import { Link } from "react-router-dom";
import { Image } from "lucide-react";
import { ISearchedBooks } from "@/types/books";

interface Props {
  books: ISearchedBooks;
}

const GridBookList = ({ books }: Props) => {
  return (
    <>
      {books.items?.map((item, idx) => (
        <Link
          key={idx}
          to={`/book/${item.id}`}
          className="bg-white shadow-md rounded-lg flex flex-col"
        >
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
          <h3 className="text-sm sm:text-md font-semibold p-4">
            {item.volumeInfo.title}
          </h3>
        </Link>
      ))}
    </>
  );
};

export default GridBookList;
