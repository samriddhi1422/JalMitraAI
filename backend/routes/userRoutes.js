import express from 'express'
import { generateReport, runCalcuation, saveUserInput } from "../controllers/userController.js";

const userRouter = express.Router()
userRouter.post('/saveUserInput' , saveUserInput)
userRouter.post('/run' , runCalcuation)
userRouter.post('/aireport' , generateReport)

export default userRouter