import { useState } from "react";
import axios from "axios";

const AddReviewForm = ({ productId, fetchReviews }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get(
        "/api/reviews",
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchReviews(); // Refresh reviews
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          max={5}
          min={0}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="border rounded p-2 w-full"
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
