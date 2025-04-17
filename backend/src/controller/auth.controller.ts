
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { Keypair } from "@solana/web3.js";
import  {PrismaClient}  from "@prisma/client"
import jwt  from "jsonwebtoken";


const prisma = new PrismaClient()

export const login = async(req:Request, res:Response):Promise<any> => {   
    const username = req.body.username
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(password, 10)
    if(!username || !password) {
        return res.status(400).json({
            message: "Please provide a username and password",
        })
    }
   
    const user = await prisma.user.findUnique({
        where: {
            email: username,
            password: hashedPassword
        },
    })
    if(!user) {
        return res.status(401).json({
            message: "User does not exists",
        })
    }
    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET as string)
    
    res.status(200).json({token})

}
export const signup = async(req:Request, res:Response) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const hashedPassword = await bcrypt.hash(password, 10)
    const keypair = new Keypair()

    const user = prisma.user.create({
        data: {
            email: email,
            name: username,
            password: hashedPassword,
            publicKey: keypair.publicKey.toString(),
            privateKey : keypair.secretKey.toString(),   
        },
    })

    res.status(200).json({
        message: "User created successfully",
        publickKey: keypair.publicKey.toString(),
    })
}