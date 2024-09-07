"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controllers_1 = require("../controllers/book-controllers");
const authenticateToken_1 = require("../middlewares/authenticateToken/authenticateToken");
const router = (0, express_1.Router)();
router.post("/add", authenticateToken_1.authenticateToken, book_controllers_1.addBook);
router.get("/books", book_controllers_1.getBooks);
exports.default = router;
