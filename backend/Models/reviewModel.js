//review model

const mongoose = require('mongoose');

// Create Schema
const reviewSchema = new mongoose.Schema({
    productId:String,
    fullname: String,
    emailid: String,
    rating: Number,
    review: String,
  });

  // Create Model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;