import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: "Content required" });

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a Senior Executive Resume Writer. 
                    Your task: Rewrite the user's professional summary.
                    Rules:
                    1. Tone: Professional, ambitious, and confident.
                    2. Keywords: Use industry-specific power verbs (e.g., Spearheaded, Orchestrated, Optimized).
                    3. Format: Return ONLY the revised paragraph.
                    4. Constraints: No greetings, no explanations, no quotes, no conversational filler.
                    5. Keep it short but ATS score must be high.
                    `
                
                },
                { role: "user", content: `Enhance this summary: ${userContent}` }
            ],
            temperature: 0.7 
        });

        return res.status(200).json({ enhancedContent: response.choices[0].message.content.trim() });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: "Content required" });

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an ATS (Applicant Tracking System) Expert.
                    Your task: Rewrite job bullet points to be impact-driven.
                    Rules:
                    1. Use the STAR method (Situation, Task, Action, Result).
                    2. Start every bullet with a strong action verb.
                    3. Focus on quantifiable metrics (e.g., "Increased revenue by 20%").
                    4. Output format: A list of bullet points starting with "•".
                    5. No extra text or commentary.`
                },
                { role: "user", content: `Rewrite these responsibilities: ${userContent}` },
                
            ],
            temperature: 0.7, 
        });

        return res.status(200).json({ enhancedContent: response.choices[0].message.content.trim() });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { title, resumeText } = req.body;
    const userId = req.userId;

    const safeResumeText = resumeText;

    const systemPrompt = `
    You are a Professional Resume Parser specializing in Llama-3 JSON extraction.
    Your goal is to transform unstructured text into a highly accurate JSON object.

    EXTRACTION RULES:
    1. NAME: Look at the very top of the text. The first large text string is usually the name. 
    2. CONTACT: Extract email and phone using pattern matching. If missing, use null.
    3. LINKEDIN: Look for URLs containing "linkedin.com/in/".
    4. EXPERIENCE: For each role, capture 'company', 'role', 'duration' (dates), and 'description' (bullet points).
    5. EDUCATION: Capture 'school', 'degree', and 'year' of graduation.
    6. NO HALLUCINATION: If a field is not found, return an empty string "" or empty array [].
    7. FORMATTING: Return ONLY the JSON object. Do not include markdown headers like \`\`\`json or trailing text.

    REQUIRED JSON STRUCTURE:
    {
    "name": "Full Name",
    "email": "email@address.com",
    "phone": "Phone Number",
    "linkedin": "LinkedIn URL",
    "education": [{"school": "", "degree": "", "year": ""}],
    "experience": [{"company": "", "role": "", "duration": "", "description": ""}],
    "skills": ["Skill 1", "Skill 2"],
    "summary": "Brief professional summary"
    }`;
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }, 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Extract data from this text into JSON: ${safeResumeText}` },
      ],
      temperature: 0.7, 
    });

    let rawContent = response.choices[0].message.content.trim();

// SAFETY: Remove markdown blocks if the AI ignored the "No Markdown" instruction
if (rawContent.startsWith("```")) {
    rawContent = rawContent.replace(/```json|```/g, "").trim();
}

const extractedData = JSON.parse(rawContent);

    const newResume = await Resume.create({
      userId,
      title,
      ...extractedData,
    });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("Extraction Error:", error);
    return res.status(500).json({ message: "Failed to parse resume data." });
  }
};