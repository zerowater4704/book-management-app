"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controllers_1 = require("../controllers/book-controllers");
const authenticateToken_1 = require("../middlewares/authenticateToken/authenticateToken");
const uploadBook_1 = __importDefault(require("../middlewares/uploadBook"));
const router = (0, express_1.Router)();
router.post("/add", authenticateToken_1.authenticateToken, uploadBook_1.default.single("image"), book_controllers_1.addBook);
router.get("/books", book_controllers_1.getBooks);
router.get("/:id", book_controllers_1.getBook);
router.put("/updatedbook", authenticateToken_1.authenticateToken, book_controllers_1.updateBook);
router.put("/:id/action", authenticateToken_1.authenticateToken, book_controllers_1.updatelikeBook);
router.delete("/delete/:id", authenticateToken_1.authenticateToken, book_controllers_1.deleteBook);
exports.default = router;
