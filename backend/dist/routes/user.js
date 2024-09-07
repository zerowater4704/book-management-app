"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const router = (0, express_1.Router)();
router.post("/auth", user_controllers_1.createUser);
exports.default = router;
