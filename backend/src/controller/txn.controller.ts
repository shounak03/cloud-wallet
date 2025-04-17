import { PrismaClient } from "@prisma/client";
import { Keypair, Transaction,Connection } from "@solana/web3.js";
import { Response, Request } from "express";
import bs58 from "bs58";

const prisma = new PrismaClient()
export default async function signTransaction(req:Request, res:Response){
    
    const conn= new Connection("https://api.devnet.solana.com");
    const serialisedTxn = req.body.message;
    const tx = Transaction.from(Buffer.from(serialisedTxn))
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

    const keypair = Keypair.fromSecretKey(bs58.decode(process.env.privateKey!));
    tx.sign(keypair);

    const signature = await conn.sendTransaction(tx,[keypair])
    console.log(signature);
    
    res.status(200).json({
        message: "sign txn"
    })
}