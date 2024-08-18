import { Input } from "@/components/ui/input";
import { useInView } from "react-intersection-observer";
import { LoaderCircle } from "lucide-react";
import { useSearchBooks } from "@/lib/react-query/mutations";
import { useState, ChangeEvent, useEffect } from "react";
import GridBookList from "@/components/shared/GridBookList";
import useDebounce from "@/hooks/useDebounce";
import PageWrapper from "@/components/shared/PageWrapper";

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
    <PageWrapper pageTitle="Search Books">
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
    </PageWrapper>
  );
};

export default ExplorePage;
