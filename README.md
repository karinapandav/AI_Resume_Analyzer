# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built with **React**, **n8n**, and **Google Gemini** that helps job seekers evaluate their resumes against a target job role.

Users upload a PDF resume, specify their desired role, and receive an ATS-style analysis including strengths, weaknesses, missing skills, and actionable improvement suggestions.

> 🚧 This project is currently under active development.

---

## ✨ Features

### Current
- Upload resume in PDF format
- Enter target job role
- Extract text from PDF using n8n
- AI-powered resume analysis using Google Gemini
- Structured JSON output
- Modern React frontend

### Planned
- ATS Score visualization
- Resume vs Job Description Matching
- Save previous analyses
- Email downloadable reports
- Authentication
- Deployment to production

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
- Google Gemini 2.5

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

# 🚀 Current Progress

## ✅ Completed

- React project setup
- Resume upload interface
- React Hooks implementation
- PDF upload
- n8n Webhook integration
- PDF text extraction
- Google Gemini integration
- Prompt engineering
- Structured JSON generation
- AI analysis pipeline

## 🚧 In Progress

- Returning AI response to frontend
- ATS dashboard UI

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

# 📈 Future Improvements

- Drag & Drop Upload
- Authentication
- Dashboard
- History
- Multi-language support
- Export PDF Report
- Resume Scoring Analytics

---

# 👨‍💻 Author

**Karina Pandav*

B.Tech (AI & Data Science)

Building AI-powered applications with React, n8n, and LLMs.

---

## ⭐ If you found this project interesting, consider giving it a star.
