"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
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
