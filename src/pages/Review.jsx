import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { Rating, TextField, Button } from '@mui/material';

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("orderId");
  const productId = new URLSearchParams(location.search).get("productId");

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async () => {
    if (!rating || !review) {
      alert('Please provide both a rating and a review.');
      return;
    }

    setLoading(true);

    try {
      const response = await Axios({
        method: 'POST',
        url: '/api/review/add',
        data: {
          productId,
          rating,
          comment: review
        }
      });

      // const response = await Axios({
      //   ...SummaryApi.addReviewController,
      //   data: {
      //     productId,
      //     rating,
      //     comment: review
      //   },
      // });

      if (response.data.success) {
        alert('Review submitted successfully!');
        navigate(`/product/${productId}`); // Redirect back to the product page
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId || !productId) {
      navigate("/my-orders"); // Navigate back to orders if params are not present
    }
  }, [orderId, productId, navigate]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit Your Review</h2>

      <Rating
        name="rating"
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        precision={0.5}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        label="Write your review"
        variant="outlined"
        className="mt-4"
      />

      <Button
        onClick={handleSubmitReview}
        variant="contained"
        color="primary"
        className="mt-4"
        disabled={loading}
      >
        Submit Review
      </Button>
    </div>
  );
};

export default Review;
