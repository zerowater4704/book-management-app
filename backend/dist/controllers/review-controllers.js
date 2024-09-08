"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const Review_1 = __importDefault(require("../model/Review"));
const Book_1 = __importDefault(require("../model/Book"));
const createReview = async (req, res) => {
    const { id: userId } = req.body.user;
    const { bookId, content, rating } = req.body;
    try {
        const findBook = await Book_1.default.findById(bookId);
        if (!findBook) {
            return res.status(404).json({ message: "本を見つかれません。" });
        }
        const newReview = new Review_1.default({
            content,
            rating,
            user: userId,
            book: bookId,
        });
        const savedReview = await newReview.save();
        findBook.reviews.push(savedReview.id);
        await findBook.save();
        res.status(200).json(savedReview);
    }
    catch (error) {
        res.status(500).json({ message: "レビュー作成に失敗しました。" });
    }
};
exports.createReview = createReview;
