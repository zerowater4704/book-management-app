import { Response, Request } from "express";
import Book from "../model/Book";

//book追加
export const addBook = async (req: Request, res: Response) => {
  const { title, author, image, description } = req.body;
  const { id: userId } = req.body.user;

  const newBook = new Book({
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
  } catch (error) {
    res.status(500).json({ message: "createBook APIでエラーがあります。" });
  }
};

//book一覧
export const getBooks = async (req: Request, res: Response) => {
  try {
    const allBook = await Book.find();
    res.status(200).json(allBook);
  } catch (error) {
    res.status(500).json({ message: "本一覧取得に失敗しました。" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const findBook = await Book.findById(bookId);
    if (!findBook) {
      return res.status(404).json({ message: "本を見つかれません。" });
    }
    res.status(200).json(findBook);
  } catch (error) {
    res.status(500).json({ message: "本を見つかれません。" });
  }
};

//book 更新
export const updateBook = async (req: Request, res: Response) => {
  const { title, author, image, description, bookId } = req.body;
  const { id: userId } = req.body.user;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "本場見つかりません。" });
    }

    if (book.addedBy.toString() !== userId) {
      return res.status(404).json({ message: "本の更新の権限がありません。" });
    }

    const updatedbook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, image, description },
      { new: true }
    );
    res.status(200).json(updatedbook);
  } catch (error) {
    res.status(500).json({ message: "bookアップデートに失敗しました。" });
  }
};

// book削除
export const deleteBook = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "本を見つかりません。" });
    }

    if (book.addedBy.toString() !== userId) {
      return res.status(404).json({ message: "本の削除の権限がありません。" });
    }

    const deleteBook = await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "本を削除しました。", deleteBook });
  } catch (error) {
    res.status(500).json({ message: "book削除に失敗しました。" });
  }
};

// book like
export const updatelikeBook = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const bookId = req.params.id;
  const { action } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "本を見つかれません。" });
    }

    if (action === "like") {
      if (!book.likes.includes(userId)) {
        await book.updateOne({
          $pull: {
            dislikes: userId,
          },
          $push: {
            likes: userId,
          },
        });
        return res.status(200).json({ message: "likeを押しました。" });
      } else {
        return res.status(400).json({ message: "既にlikeを押しています。" });
      }
    } else if (action === "dislike") {
      if (!book.dislikes.includes(userId)) {
        await book.updateOne({
          $push: {
            dislikes: userId,
          },
          $pull: {
            likes: userId,
          },
        });
        return res.status(200).json({ message: "dislikeを押しました。" });
      } else {
        return res.status(400).json({ message: "既にdislikeを押しています。" });
      }
    } else {
      return res.status(400).json({ message: "無効なアクションです。" });
    }
  } catch (error) {
    console.error("エラー内容:", error);
    res.status(500).json({ message: "LIKEの追加に失敗しました。" });
  }
};
