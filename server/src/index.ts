import express from "express";
import userRouter from "./users/user.routes";
import authRouter from "./Auth/auth.routes";
import hobbyRouter from "./hobby/hobby.routes";
import connectToDatabase from "./database/db";
import cors from 'cors';
const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));

app.use(express.json());
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/hobby', hobbyRouter)

connectToDatabase()

app.listen(3000, ()=> {
    console.log("app is listening on port 3000")
})