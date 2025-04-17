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
exports.default = signTransaction;
const client_1 = require("@prisma/client");
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const prisma = new client_1.PrismaClient();
function signTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = new web3_js_1.Connection("https://api.devnet.solana.com");
        const serialisedTxn = req.body.message;
        const tx = web3_js_1.Transaction.from(Buffer.from(serialisedTxn));
        // const userId = req.body.user;   
        // const user = await prisma.user.findUnique({
        //     where: {
        //         id: userId,
        //     },
        // })
        // const privateKey = user?.privateKey;
        // if(!privateKey) {
        //     return res.status(401).json({
        //         message: "User not found",
        //     })
        // } 
        // const {blockhash} = await conn.getLatestBlockhash();
        // tx.blockhash = blockhash
        const keypair = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(process.env.privateKey));
        tx.sign(keypair);
        const signature = yield conn.sendTransaction(tx, [keypair]);
        console.log(signature);
        res.status(200).json({
            message: "sign txn"
        });
    });
}
