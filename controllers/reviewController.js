const Review = require('../models/reviewModel');

const updateReview = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const review = await Review.findOne({ _id: id, user: req.user._id });
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found or not yours' });
        }
        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;
        await review.save();
        res.status(200).json({ success: true, message: 'Review updated', data: review });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteReview = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const { id } = req.params;
    try {
        const review = await Review.findOneAndDelete({ _id: id, user: req.user._id });
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found or not yours' });
        }
        res.status(200).json({ success: true, message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {updateReview, deleteReview};