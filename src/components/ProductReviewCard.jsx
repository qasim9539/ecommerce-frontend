import { Avatar, Box, Grid, Rating, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import Axios from '../utils/Axios';

const ProductReviewCard = ({ review, productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (rating === 0 || !comment) {
      alert('Please provide a rating and a comment.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await Axios.post('/api/review/add', {
        productId,
        rating,
        comment,
      });

      if (response.data.success) {
        alert('Review added successfully');
        setRating(0);
        setComment('');
      } else {
        alert('Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar className='text-white' sx={{ width: 40, height: 40, bgcolor: "#9155fd" }}>
              {review.userId.avatar ? (
                <img src={review.userId.avatar} alt={review.userId.name} className="w-full h-full object-cover" />
              ) : (
                // If no avatar, show the first letter of the user's name
                review.userId.name.charAt(0).toUpperCase()
              )}
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className='space-y-2'>
            <div>
              <p className='font-semibold text-lg'>{review.userId.name}</p>
              <p className='opacity-70'>
                {new Date(review.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
          <Rating value={review.rating} name='half-rating' precision={0.5} readOnly />
          <p>{review.comment}</p>
        </Grid>
      </Grid>


    </>




  );
};

export default ProductReviewCard;
