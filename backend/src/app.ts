import express from "express";
import userRouter from "./routes/user";
import bookRouter from "./routes/book";
import commentRouter from "./routes/comment";
import connectDB from "./db";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;
connectDB();

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/comment", commentRouter);

app.listen(PORT, () => {
  console.log("サーバーがつながりました。");
});
