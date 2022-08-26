import { Router } from "express";
import itemRouter from "./itemRouter.js"
import userRouter from "./userRouter.js"
import balanceRouter from "./balanceRouter.js"
import invRouter from "./invRouter.js"

const router = new Router()

router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/balance', balanceRouter)
router.use('/inv', invRouter)

export default router