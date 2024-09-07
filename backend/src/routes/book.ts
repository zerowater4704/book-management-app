import { Router } from "express";
import { addBook, getBooks } from "../controllers/book-controllers";
import { authenticateToken } from "../middlewares/authenticateToken/authenticateToken";

const router = Router();

router.post("/add", authenticateToken, addBook);
router.get("/books", getBooks);

export default router;
