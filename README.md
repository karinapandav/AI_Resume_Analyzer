🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built with React, Express, Node.js, PDFparsing, OpenRouter, and Google Gemini/n8n during prototyping.

Users upload a PDF resume, specify a target job role, and receive anATS-style analysis including an ATS score, professional summary,detected skills, strengths, weaknesses, missing skills, and actionableimprovement suggestions.

🚀 The application is deployed and usable online.

🌐 Live Demo

Frontend: https://frontend-neon-six-93.vercel.app

Backend: https://ai-resume-analyzer-api-9igr.onrender.com

✨ Features

PDF resume upload

Target job-role input

PDF text extraction

ATS-style AI analysis

ATS score from 0--100

Professional summary

Skills detected

Strengths and weaknesses

Missing skills for the target role

Resume improvement suggestions

Responsive React UI

Production REST API

Free-model AI inference through OpenRouter

🏗️ Production Architecture

React Frontend (Vercel)
        │
        │ POST /analyze-resume
        ▼
Express API (Render)
        │
        ├── Multer → receives PDF
        │
        ├── pdf-parse → extracts text
        │
        └── OpenRouter API
                 │
                 ▼
          Free LLM Model
                 │
                 ▼
          Structured JSON
                 │
                 ▼
        React Results Dashboard

🧪 Original n8n Prototype

The project was initially prototyped using n8n:

React
  ↓
n8n Webhook
  ↓
Extract PDF Text
  ↓
Google Gemini
  ↓
Structured JSON
  ↓
React

The n8n workflow is preserved in:

workflow/AI_resume_analyzer.json

The production backend was later migrated to Express because the freeRender environment was not a good fit for running the full n8n server.The migration preserved the same core pipeline and AI output structure.

🛠️ Tech Stack

Frontend

React

Vite

CSS

Fetch API

Backend

Node.js

Express

Multer

pdf-parse

CORS

dotenv

AI

OpenRouter API

Free LLM model

Prompt engineering

Structured JSON output

Automation / Prototype

n8n

Webhooks

Extract From File

Google Gemini

Deployment

Vercel --- frontend

Render --- backend

GitHub --- source control

📂 Project Structure

AI_Resume_Analyzer/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── ResumeForm.jsx
│   │   │   └── ResumeForm.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── workflow/
│   └── AI_resume_analyzer.json
│
├── screenshots/
│
├── README.md
└── LICENSE

🔌 API

GET /

Health check.

Example response:

{
  "status": "online",
  "message": "AI Resume Analyzer API is running"
}

POST /analyze-resume

Accepts multipart/form-data.

Fields:

fullName

targetRole

resume --- PDF file

The backend:

Validates the uploaded file.

Extracts text from the PDF.

Builds the ATS analysis prompt.

Sends the prompt to OpenRouter.

Parses the AI response.

Returns the analysis as JSON.

🔐 Environment Variables

Create backend/.env locally:

OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=openai/gpt-oss-20b:free
PORT=5000
APP_URL=http://localhost:5173

Never commit .env to GitHub.

For Render, configure the secrets in the Render dashboard instead ofstoring them in the repository.

💻 Run Locally

Frontend

cd frontend
npm install
npm run dev

Backend

cd backend
npm install
node server.js

The local API runs on:

http://localhost:5000

🧠 AI Output

The backend asks the model to return:

{
  "professional_summary": "",
  "ats_score": 0,
  "skills_detected": [],
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "resume_improvement_suggestions": []
}

👨‍💻 Author

Karina Pandav

B.Tech --- Artificial Intelligence & Data Science

Building AI-powered applications with React, Node.js, automationworkflows, and LLM APIs.

⭐ Project

If you found this project interesting, consider giving it a star.
