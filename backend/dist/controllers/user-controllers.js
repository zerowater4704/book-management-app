"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../model/User"));
// 新規登録
const createUser = async (req, res) => {
    const { name, email, password, image } = req.body;
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "ユーザーが既に存在しています。" });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = new User_1.default({
        name,
        email,
        password: hashedPassword,
        image,
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: "新規登録APIでエラーがあります。", error });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "emailが間違っています。" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "パスワードが間違っています。" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        return res
            .status(200)
            .json({ token, user: { name: user.name, id: user._id } });
    }
    catch (error) {
        res.status(500).json({ message: "ログインAPIでエラーがあります。", error });
    }
};
exports.loginUser = loginUser;
const updateUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "認証されていません。" });
    }
    const userId = req.user.id;
    const { name, email, password, image } = req.body;
    const updateData = { name, email, image };
    // パスワードが送信された場合、ハッシュ化して保存
    if (password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        updateData.password = hashedPassword;
    }
    try {
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, updateData, {
            new: true,
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "updateUser APIでエラーがあります。", error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "認証されていません。" });
    }
    const userId = req.user.id;
    const { password } = req.body;
    try {
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "ユーザーを見つかれません。" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "パスワードが間違っています。" });
        }
        await User_1.default.findByIdAndDelete(userId);
        res.status(200).json({ message: "ユーザーを削除しました。" });
    }
    catch (error) {
        res.status(500).json({ message: "ユーザー削除に失敗しました。" });
    }
};
exports.deleteUser = deleteUser;
