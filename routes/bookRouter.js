const express = require('express');
const {isLoggedIn} = require('../middlewares/authMiddleware');
const {createBook, getAllBooks, getBookById, createReview, searchBooks}= require('../controllers/bookController');

const bookRouter = express.Router();

bookRouter.post('/', isLoggedIn, createBook);
bookRouter.get('/', isLoggedIn,getAllBooks);
bookRouter.get('/:id', isLoggedIn,getBookById);
bookRouter.post('/:id/reviews', isLoggedIn, createReview);
bookRouter.get('/search', isLoggedIn, searchBooks);

module.exports = bookRouter;

