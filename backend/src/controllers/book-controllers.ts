import { Response, Request } from "express";
import Book from "../model/Book";

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

export const getBooks = async (req: Request, res: Response) => {
  try {
    const allBook = await Book.find();
    res.status(200).json(allBook);
  } catch (error) {
    res.status(500).json({ message: "本一覧取得に失敗しました。" });
  }
};
