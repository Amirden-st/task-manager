import express from "express"
import todosRouter from './todos.js'
import authRouter from './auth.js'

const router = express.Router()

router.use('/todos', todosRouter)

router.use('/auth', authRouter)

export default router