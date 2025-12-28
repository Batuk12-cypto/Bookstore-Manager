const { Book } = require('../models/book.modal');


const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (!body.BookName || !body.BookTitle || !body.AuthorName || !body.Price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bookAdd = await Book.create(body);
    if (bookAdd) {
      return res.status(201).json({ message: "Book added successfully", data: bookAdd });
    }

    return res.status(500).json({ message: "Unable to add book" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const handleBookListController = async (req, res) => {
    try {
      const bookList = await Book.find({});
        return res.status(200).json({ bookList });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const handleBookDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (deletedBook) {
      return res.status(200).json({ message: "Book deleted successfully" });
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleBookUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (!body.BookName || !body.BookTitle || !body.AuthorName || !body.Price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await Book.findByIdAndUpdate(id, body, { new: true });
    if (updated) {
      return res.status(200).json({ message: "Book updated successfully", data: updated });
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { handleBookStoreController, handleBookListController, handleBookDeleteController, handleBookUpdateController };