import Book from "../model/book.model.js";   // Capital B convention

export const getbook = async (req, res) => {
    try {
        const books = await Book.find();   // plural naam use karo
        res.status(200).json(books);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
};
