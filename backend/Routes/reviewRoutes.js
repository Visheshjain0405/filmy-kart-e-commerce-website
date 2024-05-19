const express = require('express');
const router = express.Router();
const Review = require('../Models/reviewModel'); // Adjust the path as needed

// Route for submitting a review
router.post('/api/review', async (req, res) => {
  const { fullname, emailid, rating, review, productId } = req.body;
  if (!fullname || !emailid || !rating || !review || !productId) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const newReview = new Review({
    productId,
      fullname,
      emailid,
      rating,
      review,
    });
    await newReview.save();
    res.status(201).send('Review submitted successfully');
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/api/reviews/:id', async (req, res) => {
    const id=req.params.id;
    try {
      const reviews = await Review.find({ productId:id });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'An error occurred while fetching reviews' });
    }
  });
  
  router.get('/api/reviews', async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
