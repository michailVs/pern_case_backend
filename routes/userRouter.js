import { Router } from "express";
import { check, login, reg } from "../controllers/userController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const router = new Router()

router.post('/reg', reg)
router.post('/login', login)
router.get('/auth', AuthMiddleware, check)

export default router