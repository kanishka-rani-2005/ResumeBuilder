import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumes, getResumeById, updateResume } from "../controllers/resumeContoller.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();


resumeRouter.post("/create",protect, createResume); //protect is middleware
resumeRouter.put("/update",upload.single('image'),protect, updateResume);
resumeRouter.delete("/delete/:resumeId",protect, deleteResume); //protect is middleware
resumeRouter.get("/get/:resumeId",protect, getResumeById); //protect is middleware
resumeRouter.get("/public/:resumeId", getPublicResumes); //no protect middleware


export default resumeRouter;