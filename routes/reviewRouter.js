const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const {updateReview, deleteReview} = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.put('/:id', isLoggedIn, updateReview);
reviewRouter.delete('/:id', isLoggedIn, deleteReview);

module.exports = reviewRouter;