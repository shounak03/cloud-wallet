import { Router } from "express";
import { login, signup } from "../controller/auth.controller";

const router = Router()

router.get('/login',login)
router.post('/signup',signup)

export  default router