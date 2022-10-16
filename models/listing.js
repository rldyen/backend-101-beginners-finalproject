const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    cafeName: {
        type: String,
        required: true
    },
    uploader: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    cafeAddress: {
        type: String,
        required: true
    },
    datePosted: String
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;