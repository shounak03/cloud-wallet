import { Router } from "express";
import signTransaction from "../controller/txn.controller";


const router = Router()

router.post("/txn/sign",signTransaction)

export  default router