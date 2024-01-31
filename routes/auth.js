import express from "express"
import {registerValidation} from "../validations/auth.js";
import {checkAuth} from "../middleware/auth.js";
import {getMe, login, register} from "../controllers/auth.js";

const router = express.Router()

router.post('/register', registerValidation, register)

router.post('/login', login)

router.get('/me', checkAuth, getMe)

export default router