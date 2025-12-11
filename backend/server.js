import '../backend/config/env.js'
import express from 'express';
import cors from 'cors'
 import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import router from './test/modelTest.js';

 const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())
connectDB()


app.use('/api/user' , userRouter)
app.use('/test' , router)
app.get("/", (req, res) => {
    res.send("Rainwater Backend Running 🚀");
});
  app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });