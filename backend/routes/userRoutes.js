import express from 'express'
import { generateReport, login, registratingUser, reports, runCalcuation, saveUserInput, viewReport } from "../controllers/userController.js";
import authMiddleware from '../middlewears/authMiddleware.js';

const userRouter = express.Router()
userRouter.post('/saveUserInput' ,authMiddleware, saveUserInput)
userRouter.post('/run' ,authMiddleware, runCalcuation)
userRouter.post('/aireport' ,authMiddleware, generateReport)
userRouter.post('/register' , registratingUser)
userRouter.post('/login' , login)
userRouter.get('/reports',authMiddleware, reports)
userRouter.get('/view-report/:id',authMiddleware, viewReport)

export default userRouter