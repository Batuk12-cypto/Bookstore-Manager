const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
    BookName: {
        type: String,
        required: true
    },
    BookTitle:{
        type: String,
        required: true
    },
    AuthorName:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    PublishedDate:{
        type: Date
    }
    },
    { timestamps: true}
);

const Book = mongoose.model('books', bookSchema);
module.exports = {Book};