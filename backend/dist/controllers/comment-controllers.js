"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../model/Comment"));
const Book_1 = __importDefault(require("../model/Book"));
const createComment = async (req, res) => {
    const { id: userId } = req.body.user;
    const { bookId, comment, rating } = req.body;
    try {
        const findBook = await Book_1.default.findById(bookId);
        if (!findBook) {
            return res.status(404).json({ message: "本を見つかれません。" });
        }
        const newReview = new Comment_1.default({
            comment,
            rating,
            user: userId,
            book: bookId,
        });
        const savedReview = await newReview.save();
        findBook.comment.push(savedReview.id);
        await findBook.save();
        res.status(200).json(savedReview);
    }
    catch (error) {
        res.status(500).json({ message: "レビュー作成に失敗しました。" });
    }
};
exports.createComment = createComment;
const deleteComment = async (req, res) => {
    const { id: userId } = req.body.user;
    const commentId = req.params.id;
    try {
        const comment = await Comment_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "コメントを見つかりません。" });
        }
        if (comment.user.toString() !== userId) {
            return res
                .status(404)
                .json({ message: "コメント削除する権限がありません。" });
        }
        const deleteComment = await Comment_1.default.findByIdAndDelete(commentId);
        if (!deleteComment) {
            return res
                .status(404)
                .json({ message: "コメント削除に失敗しました。。" });
        }
        await Book_1.default.findByIdAndUpdate(deleteComment.book, {
            $pull: {
                comment: commentId,
            },
        });
        res.status(200).json({ message: "commentを削除しました。", deleteComment });
    }
    catch (error) {
        res.status(500).json({ message: "deleteCommentに失敗しました。" });
    }
};
exports.deleteComment = deleteComment;
