import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"];
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY as string);
    if(!userId) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
    req.body.user = userId;
    next();
}