"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken/authenticateToken");
const review_controllers_1 = require("../controllers/review-controllers");
const router = (0, express_1.Router)();
router.post("/add", authenticateToken_1.authenticateToken, review_controllers_1.createReview);
exports.default = router;
