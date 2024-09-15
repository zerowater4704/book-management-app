import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken/authenticateToken";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment-controllers";

const router = Router();

router.post("/add", authenticateToken, createComment);
router.get("/:id", getComments);
router.put("/:id/update", authenticateToken, updateComment);
router.delete("/:id/delete", authenticateToken, deleteComment);

export default router;
