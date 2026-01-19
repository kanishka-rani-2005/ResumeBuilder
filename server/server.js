import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


const app=express();
const PORT = process.env.PORT || 10000;

await connectDB();
const cors = require('cors');
app.use(cors({
  origin: "https://resume-builder-nine-umber.vercel.app"
}));
app.use(express.json({ limit: '10mb' })); 




app.get("/",(req,res)=>{
    res.send("Welcome to the server!");
});

app.use("/api/users",userRouter);
app.use("/api/resumes",resumeRouter);
app.use("/api/ai",aiRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
