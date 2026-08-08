const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { PDFParse } = require("pdf-parse");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store uploaded PDF in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "AI Resume Analyzer API is running",
  });
});

// Resume analysis endpoint
app.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload a PDF resume.",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        error: "Only PDF files are supported.",
      });
    }

    const { fullName, targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        error: "Target job role is required.",
      });
    }

    // Extract text from PDF
    const parser = new PDFParse({
    data: req.file.buffer,
    });

    const pdfData = await parser.getText();
    const resumeText = pdfData.text;

    await parser.destroy();

    if (!resumeText.trim()) {
      return res.status(400).json({
        error: "Could not extract text from the PDF.",
      });
    }

    // Check OpenRouter API key
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OpenRouter API key is not configured.",
      });
    }

    // AI prompt
    const prompt = `
You are an expert ATS Resume Reviewer and Career Coach.

Analyze the following resume against the target job role.

Candidate Name:
${fullName || "Not provided"}

Target Job Role:
${targetRole}

Resume Content:
${resumeText}

Rules:
- Be objective and constructive.
- Base your analysis only on the provided resume.
- Do not invent experience, qualifications, or skills.
- Evaluate how well the resume matches the target role.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include code fences.

Return exactly this JSON structure:

{
  "professional_summary": "",
  "ats_score": 0,
  "skills_detected": [],
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "resume_improvement_suggestions": []
}

The ats_score must be an integer between 0 and 100.
`;

    // Call OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.APP_URL || "http://localhost:5173",
          "X-Title": "AI Resume Analyzer",
        },
        body: JSON.stringify({
          model:
            process.env.OPENROUTER_MODEL ||
            "openrouter/free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
        }),
      }
    );

    const aiData = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", aiData);

      return res.status(502).json({
        error: "AI service request failed.",
        details: aiData?.error?.message || "Unknown AI error",
      });
    }

    const aiText = aiData?.choices?.[0]?.message?.content;

    if (!aiText) {
      return res.status(502).json({
        error: "AI returned an empty response.",
      });
    }

    // Remove possible markdown code fences
    const cleanedText = aiText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("AI JSON parsing failed:", aiText);

      return res.status(502).json({
        error: "AI returned invalid JSON.",
        raw_response: aiText,
      });
    }

    // Return analysis to frontend
    res.json(analysis);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Something went wrong while analyzing the resume.",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Resume Analyzer API running on port ${PORT}`);
});