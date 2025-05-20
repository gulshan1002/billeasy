const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

const createBook = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const { title, genre, content } = req.body;
    try {
        const book = await Book.create({
            title,
            genre,
            content,
            author: req.user._id
        });
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, author, genre } = req.query;
        const filter = {};
        if (author) filter.author = author;
        if (genre) filter.genre = genre;

        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Book.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    const { reviewPage = 1, reviewLimit = 5 } = req.query;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        const reviews = await Review.find({ book: id })
            .skip((reviewPage - 1) * reviewLimit)
            .limit(Number(reviewLimit))
            .populate('user', 'name');
        const avgRatingAgg = await Review.aggregate([
            { $match: { book: book._id } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } }
        ]);
        const averageRating = avgRatingAgg[0]?.avgRating || 0;
        const totalReviews = await Review.countDocuments({ book: id });

        res.status(200).json({
            success: true,
            data: {
                book,
                averageRating,
                reviews,
                totalReviews,
                reviewPage: Number(reviewPage),
                reviewPages: Math.ceil(totalReviews / reviewLimit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const createReview = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    try {
        const existing = await Review.findOne({ book: bookId, user: req.user._id });
        if (existing) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this book' });
        }
        const review = await Review.create({
            book: bookId,
            user: req.user._id,
            rating,
            comment
        });
        res.status(201).json({ success: true, message: 'Review added', data: review });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Query parameter "q" is required'
            });
        }

        // Find by title
        let books = await Book.find({
            title: { $regex: q, $options: 'i' }
        }).populate('author', 'name');

        // Find by author name
        const booksByAuthor = await Book.find()
            .populate({
                path: 'author',
                match: { name: { $regex: q, $options: 'i' } },
                select: 'name'
            });

        // Filter out books where author is null (no match)
        const authorMatches = booksByAuthor.filter(book => book.author);

        // Merge and remove duplicates
        const allBooks = [...books, ...authorMatches].filter(
            (book, index, self) =>
                index === self.findIndex(b => b._id.toString() === book._id.toString())
        );

        res.status(200).json({
            success: true,
            message: 'Books search results',
            data: allBooks
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    createReview,
    searchBooks
};