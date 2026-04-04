import express from 'express'
import { chatWithReport, downloadAIReport, generateMonthlyReport, generateReport, login, registratingUser, reports, runCalcuation, saveUserInput, viewReport } from "../controllers/userController.js";
import authMiddleware from '../middlewears/authMiddleware.js';

const userRouter = express.Router()
userRouter.post('/saveUserInput' ,authMiddleware, saveUserInput)
userRouter.post('/run' ,authMiddleware, runCalcuation)
userRouter.post('/aireport' ,authMiddleware, generateReport)
userRouter.post('/register' , registratingUser)
userRouter.post('/login' , login)
userRouter.get('/reports',authMiddleware, reports)
userRouter.get('/view-report/:id',authMiddleware, viewReport)
userRouter.post('/getMonthly',authMiddleware ,generateMonthlyReport )
userRouter.get('/download/:id', authMiddleware,downloadAIReport)
userRouter.post('/chat', authMiddleware,chatWithReport)
export default userRouter