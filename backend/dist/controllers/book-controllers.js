"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.addBook = void 0;
const Book_1 = __importDefault(require("../model/Book"));
const addBook = async (req, res) => {
    const { title, author, image, description } = req.body;
    const { id: userId } = req.body.user;
    const newBook = new Book_1.default({
        title,
        author,
        description,
        image,
        reviews: [],
        addedBy: userId,
    });
    try {
        const savedBook = await newBook.save();
        res.status(200).json({ savedBook });
    }
    catch (error) {
        res.status(500).json({ message: "createBook APIでエラーがあります。" });
    }
};
exports.addBook = addBook;
const getBooks = async (req, res) => {
    try {
        const allBook = await Book_1.default.find();
        res.status(200).json(allBook);
    }
    catch (error) {
        res.status(500).json({ message: "本一覧取得に失敗しました。" });
    }
};
exports.getBooks = getBooks;
