import { Request, Response } from "express";
import Comment from "../model/Comment";
import Book from "../model/Book";
import User from "../model/User";

// コメント作成
export const createComment = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const { bookId, comment, rating } = req.body;

  try {
    const findBook = await Book.findById(bookId);
    if (!findBook) {
      return res.status(404).json({ message: "本を見つかれません。" });
    }

    const newReview = new Comment({
      comment,
      rating,
      user: userId,
      book: bookId,
    });

    const savedReview = await newReview.save();
    findBook.comment.push(savedReview.id);
    await findBook.save();

    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "レビュー作成に失敗しました。" });
  }
};

// コメント更新
export const updateComment = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const commentId = req.params.id;
  const { comment } = req.body;

  try {
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "コメントを見つかれません。" });
    }

    if (existingComment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "コメントを更新する権限がありません。" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        comment,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "updateCommentに失敗しました。" });
  }
};

// コメント削除
export const deleteComment = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "コメントを見つかりません。" });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "コメント削除する権限がありません。" });
    }

    const deleteComment = await Comment.findByIdAndDelete(commentId);
    if (!deleteComment) {
      return res
        .status(404)
        .json({ message: "コメント削除に失敗しました。。" });
    }

    await Book.findByIdAndUpdate(deleteComment.book, {
      $pull: {
        comment: commentId,
      },
    });
    res.status(200).json({ message: "commentを削除しました。", deleteComment });
  } catch (error) {
    res.status(500).json({ message: "deleteCommentに失敗しました。" });
  }
};
