import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User";

// 新規登録
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, image } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "ユーザーが既に存在しています。" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "新規登録APIでエラーがあります。", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "emailが間違っています。" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "パスワードが間違っています。" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).send({ token });
  } catch (error) {
    res.status(500).json({ message: "ログインAPIでエラーがあります。", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const { name, email, password, image } = req.body;

  const updateData: any = { name, email, image };

  // パスワードが送信された場合、ハッシュ化して保存
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "updateUser APIでエラーがあります。", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const { password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "ユーザーを見つかれません。" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "パスワードが間違っています。" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "ユーザーを削除しました。" });
  } catch (error) {
    res.status(500).json({ message: "ユーザー削除に失敗しました。" });
  }
};
