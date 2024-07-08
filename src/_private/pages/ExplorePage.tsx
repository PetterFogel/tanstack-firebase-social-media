import { Input } from "@/components/ui/input";
import { useInView } from "react-intersection-observer";
import { LoaderCircle } from "lucide-react";
import { useSearchBooks } from "@/lib/react-query/mutations";
import { useState, ChangeEvent, useEffect } from "react";
import GridBookList from "@/components/shared/GridBookList";
import useDebounce from "@/hooks/useDebounce";

const ExplorePage = () => {
  const { ref, inView } = useInView();
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce(inputValue, 500);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, data } =
    useSearchBooks(debouncedSearch);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) return;
    fetchNextPage();
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
      <div className="space-y-8 md:space-y-12">
        <h2 className="text-3xl font-bold">Search Books</h2>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for books"
          />
        </form>
        {isLoading && !isFetchingNextPage && (
          <div className="flex justify-center">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        )}
        {data?.pages?.[0]?.totalItems === 0 && <p>No results found.</p>}
        {data?.pages && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.pages?.map((page, pageIndex) => (
              <GridBookList key={pageIndex} books={page} />
            ))}
          </div>
        )}
        {hasNextPage && (
          <div ref={ref} className="flex justify-center mt-8">
            <LoaderCircle className="h-16 w-16 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
