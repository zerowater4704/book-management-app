"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const authenticateToken_1 = require("../middlewares/authenticateToken/authenticateToken");
const router = (0, express_1.Router)();
router.post("/auth", user_controllers_1.createUser);
router.post("/login", user_controllers_1.loginUser);
router.put("/update", authenticateToken_1.authenticateToken, user_controllers_1.updateUser);
router.delete("/delete", authenticateToken_1.authenticateToken, user_controllers_1.deleteUser);
exports.default = router;
