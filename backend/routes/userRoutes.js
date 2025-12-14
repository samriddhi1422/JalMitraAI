import express from 'express'
import { generateReport, login, registratingUser, runCalcuation, saveUserInput } from "../controllers/userController.js";
import authMiddleware from '../middlewears/authMiddleware.js';

const userRouter = express.Router()
userRouter.post('/saveUserInput' ,authMiddleware, saveUserInput)
userRouter.post('/run' ,authMiddleware, runCalcuation)
userRouter.post('/aireport' ,authMiddleware, generateReport)
userRouter.post('/register' , registratingUser)
userRouter.post('/login' , login)

export default userRouter