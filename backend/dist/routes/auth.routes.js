"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
router.get('/login', auth_controller_1.login);
router.post('/signup', auth_controller_1.signup);
exports.default = router;
