"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const web3_js_1 = require("@solana/web3.js");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    if (!username || !password) {
        return res.status(400).json({
            message: "Please provide a username and password",
        });
    }
    const user = yield prisma.user.findUnique({
        where: {
            email: username,
            password: hashedPassword
        },
    });
    if (!user) {
        return res.status(401).json({
            message: "User does not exists",
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const keypair = new web3_js_1.Keypair();
    const user = prisma.user.create({
        data: {
            email: email,
            name: username,
            password: hashedPassword,
            publicKey: keypair.publicKey.toString(),
            privateKey: keypair.secretKey.toString(),
        },
    });
    res.status(200).json({
        message: "User created successfully",
        publickKey: keypair.publicKey.toString(),
    });
});
exports.signup = signup;
