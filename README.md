# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built with **React**, **n8n**, and **Google Gemini** that helps job seekers evaluate their resumes against a target job role.

Users upload a PDF resume, specify their desired role, and receive an ATS-style analysis including strengths, weaknesses, missing skills, and actionable improvement suggestions.

> 🚧 This project is currently under active development.

---

## ✨ Features

- Upload resumes in PDF format
- Enter a target job role
- Extract text from resumes using n8n
- AI-powered ATS-style resume analysis
- Professional summary generation
- ATS compatibility score
- Skills detection
- Strengths & weaknesses analysis
- Missing skills identification
- Personalized resume improvement suggestions
- Responsive React UI

---

# 🏗️ Architecture

```text
                React Frontend
                       │
                       ▼
               Resume Upload Form
                       │
                       ▼
                n8n Webhook API
                       │
                       ▼
              Extract PDF Text
                       │
                       ▼
             Google Gemini AI
                       │
                       ▼
            Structured JSON Response
                       │
                       ▼
               React Results Page
```

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- CSS

## Backend
- n8n
- Google Gemini
- Webhooks
- Extract from File Node

## AI
- Google Gemini LLM

---

# 📂 Project Structure

```
AI_Resume_Analyzer
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── assets
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── workflow
│   └── (n8n workflow export)
│
└── README.md
```

---

## 🚀 Current Progress

### ✅ Completed

- React frontend
- Resume upload interface
- PDF extraction
- n8n webhook integration
- Google Gemini integration
- Prompt engineering
- Structured JSON output
- ATS score generation
- Professional summary
- Skills detection
- Strength analysis
- Weakness analysis
- Missing skills detection
- Resume improvement suggestions
- Responsive dashboard UI

### 🚧 Planned

- Resume vs Job Description Matching
- Download analysis as PDF
- User authentication
- Resume history
- Production deployment

---

# 📸 Screenshots

Coming soon.

---

# 🗺️ Development Roadmap

## Phase 1
- [x] React Frontend
- [x] Resume Upload
- [x] PDF Extraction

## Phase 2
- [x] Gemini Integration
- [x] Structured JSON Output
- [ ] Display AI Analysis

## Phase 3
- [ ] Resume vs Job Description Matching
- [ ] Save Reports
- [ ] Email Reports
- [ ] Deployment

---

# 💻 Running Locally

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

Run the n8n workflow locally and configure:

- Google Gemini credentials
- Webhook URL

---

## 📈 Future Improvements

- Job description matching
- Export analysis as PDF
- Authentication
- Resume history dashboard
- Dark mode
- Drag-and-drop upload
- Multiple AI model support
- Multi-language resume analysis

---

# 👨‍💻 Author

**Karina Pandav**

B.Tech (AI & Data Science)

Building AI-powered applications with React, n8n, and LLMs.

---

## ⭐ If you found this project interesting, consider giving it a star.
