const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');
const reviewRouter = require('./routes/reviewRouter');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/books', bookRouter);
app.use('/reviews', reviewRouter);
app.use('/search', bookRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
}); 

module.exports = app;