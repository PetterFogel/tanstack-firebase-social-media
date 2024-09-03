import { Star } from "lucide-react";
import { useState } from "react";
import { useUpdateBookRating } from "@/lib/react-query/mutations";

interface Props {
  bookId: string;
  userId: string;
  rating: number;
}

const StarRatingButton = ({ bookId, rating, userId }: Props) => {
  const [ratingValue, setRatingValue] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);

  const { mutate: updateRating } = useUpdateBookRating();

  const bookRatingHandler = (ratingValue: number) => {
    setRatingValue(ratingValue);
    updateRating({ bookId, userId, rating: ratingValue });
  };

  const mouseEnterHandler = (ratingValue: number) =>
    setHoverRating(ratingValue);
  const mouseLeaveHandler = () => setHoverRating(0);
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          fill={star <= (hoverRating || ratingValue) ? "#e87400" : "none"}
          strokeWidth={star <= (hoverRating || ratingValue) ? 0 : 1}
          size={30}
          onMouseEnter={() => mouseEnterHandler(star)}
          onClick={() => bookRatingHandler(star)}
          onMouseLeave={mouseLeaveHandler}
          className="cursor-pointer"
        />
      ))}
    </>
  );
};

export default StarRatingButton;
