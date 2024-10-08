"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComments = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../model/Comment"));
const Book_1 = __importDefault(require("../model/Book"));
// コメント作成
const createComment = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
        const populatedReview = await Comment_1.default.findById(savedReview._id).populate("user", "name");
        findBook.comment.push(savedReview.id);
        await findBook.save();
        res.status(200).json(populatedReview);
    }
    catch (error) {
        res.status(500).json({ message: "レビュー作成に失敗しました。" });
    }
};
exports.createComment = createComment;
const getComments = async (req, res) => {
    const bookId = req.params.id;
    try {
        const comments = await Comment_1.default.find({ book: bookId }).populate("user", "name");
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: "コメントの取得に失敗しました。" });
    }
};
exports.getComments = getComments;
// コメント更新
const updateComment = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const commentId = req.params.id;
    const { comment } = req.body;
    try {
        const existingComment = await Comment_1.default.findById(commentId);
        if (!existingComment) {
            return res.status(404).json({ message: "コメントを見つかれません。" });
        }
        if (existingComment.user.toString() !== userId) {
            return res
                .status(403)
                .json({ message: "コメントを更新する権限がありません。" });
        }
        const updatedComment = await Comment_1.default.findByIdAndUpdate(commentId, {
            comment,
        }, { new: true });
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ message: "updateCommentに失敗しました。" });
    }
};
exports.updateComment = updateComment;
// コメント削除
const deleteComment = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const commentId = req.params.id;
    try {
        const comment = await Comment_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "コメントを見つかりません。" });
        }
        if (comment.user.toString() !== userId) {
            return res
                .status(403)
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
