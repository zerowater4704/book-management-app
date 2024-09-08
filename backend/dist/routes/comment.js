"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken/authenticateToken");
const comment_controllers_1 = require("../controllers/comment-controllers");
const router = (0, express_1.Router)();
router.post("/add", authenticateToken_1.authenticateToken, comment_controllers_1.createComment);
router.delete("/:id/delete", authenticateToken_1.authenticateToken, comment_controllers_1.deleteComment);
exports.default = router;
