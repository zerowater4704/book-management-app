import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE!);
    console.log("DBに接続中");
  } catch (err) {
    console.error("DB接続エラー", err);
  }
};

export default connectDB;
