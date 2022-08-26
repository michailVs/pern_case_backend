import { Router } from "express";
import { create, getAll, getOne, removeItem } from "../controllers/itemController.js";

const router = new Router()

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getOne)
router.delete('/:id', removeItem)

export default router