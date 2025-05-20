const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Fantasy', 'Biography', 'Entertainment']
    },
    content: {
        type: String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;