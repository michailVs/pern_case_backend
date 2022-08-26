import { Router } from "express";
import { addItem, delItem, getInv } from "../controllers/invController.js";

const router = new Router()

router.get('/:id', getInv)
router.post('/:id', addItem)
router.post('/del/:id', delItem)


export default router