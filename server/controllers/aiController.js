import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: "User content is required" });
        }
        // console.log(userContent)

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer. Enhance the given professional summary to make it more impactful and professional. Make it compelling and ATS-friendly and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });
        console.log((response))

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer. Enhance the given job description to make it more impactful and professional. Use action verbs and quantifiable results where possible. Highlight key responsibilities and achievements. Make it compelling and ATS-friendly and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { title, resumeText } = req.body;
        const userId = req.userId;

        if (!resumeText || !title) {
            return res.status(400).json({ message: "Resume text and title are required" });
        }
        const systemPrompt = `You are an expert resume parser.
Return ONLY valid JSON exactly in the format requested.
No explanation, no markdown.`;

        const userPrompt = `Extract data and return ONLY valid JSON in this exact format: 
        (Format details here...) 
        Resume text: ${resumeText}`;

    
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        const extractedData = response.choices[0].message.content;
        
        if (!extractedData) {
            return res.status(500).json({ message: "AI failed to generate a response." });
        }

        const parsedData = JSON.parse(extractedData);

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData,
        });

        return res.status(200).json({ resumeId: newResume._id });

    } catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ message: error.message });
    }
}