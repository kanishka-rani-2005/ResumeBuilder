import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";


const ai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});

export default ai;  