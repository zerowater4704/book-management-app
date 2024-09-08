import { Router } from "express";
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
  updatelikeBook,
} from "../controllers/book-controllers";
import { authenticateToken } from "../middlewares/authenticateToken/authenticateToken";

const router = Router();

router.post("/add", authenticateToken, addBook);
router.get("/books", getBooks);
router.get("/:id", getBook);
router.put("/updatedbook", authenticateToken, updateBook);
router.put("/:id/action", authenticateToken, updatelikeBook);
router.delete("/delete/:id", authenticateToken, deleteBook);

export default router;
