import { Link } from "react-router-dom";
import { Image } from "lucide-react";
import { IBook, ISearchedBooks } from "@/types/books";

interface Props {
  books: ISearchedBooks | IBook[];
}

const GridBookList = ({ books }: Props) => {
  const data = "items" in books ? books.items : books;

  console.log("DATA GRID", data);
  return (
    <>
      {data?.map((item: IBook, idx: number) => (
        <Link
          key={idx}
          to={`/book/${item.id}`}
          className="bg-white shadow rounded-lg flex flex-col"
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
          <h3 className="text-[10px] sm:text-xs font-semibold py-3 px-2">
            {item.volumeInfo.title}
          </h3>
        </Link>
      ))}
    </>
  );
};

export default GridBookList;
