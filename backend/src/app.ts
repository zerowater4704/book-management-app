import express from "express";
import userRouter from "./routes/user";
import bookRouter from "./routes/book";
import connectDB from "./db";

const app = express();
const PORT = 3000;
connectDB();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);

app.listen(PORT, () => {
  console.log("サーバーがつながりました。");
});
