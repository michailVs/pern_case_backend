import { Router } from "express";
import { addBalance, createBalance, getBalance } from "../controllers/balanceController.js";

const router = new Router()

router.post('/', createBalance)
router.get('/:id', getBalance)
router.post('/add/:id', addBalance)

export default router