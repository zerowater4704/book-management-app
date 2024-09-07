import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/user-controllers";
import { authenticateToken } from "../middlewares/authenticateToken/authenticateToken";

const router = Router();

router.post("/auth", createUser);
router.post("/login", loginUser);
router.put("/update", authenticateToken, updateUser);
router.delete("/delete", authenticateToken, deleteUser);

export default router;
