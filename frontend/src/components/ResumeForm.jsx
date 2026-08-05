// ResumeForm.jsx
// NOTE: Replace YOUR_N8N_WEBHOOK_URL with your deployed webhook URL before deployment.

import { useState } from "react";
import "./ResumeForm.css";

export default function ResumeForm() {
  const [fullName,setFullName]=useState("");
  const [targetRole,setTargetRole]=useState("");
  const [resume,setResume]=useState(null);
  const [analysis,setAnalysis]=useState(null);
  const [loading,setLoading]=useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    if(!resume){alert("Please upload a resume.");return;}
    setLoading(true);
    const fd=new FormData();
    fd.append("fullName",fullName);
    fd.append("targetRole",targetRole);
    fd.append("resume",resume);
    try{
      const res=await fetch("http://localhost:5678/webhook/analyze-resume",{
        method:"POST",
        body:fd
      });
      const text=await res.text();
      setAnalysis(JSON.parse(text));
    }catch(err){
      console.error(err);
      alert("Analysis failed.");
    }
    setLoading(false);
  }

  const score=analysis?.ats_score??0;
  const cls=score>=80?"excellent":score>=60?"average":"poor";

  return (
    <>
      <header className="navbar">
        <h2>ResumeAI</h2>
        <a href="https://github.com/karinapandav/AI_Resume_Analyzer" target="_blank" rel="noreferrer">GitHub</a>
      </header>

      <main className="page">
        <section className="hero">
          <h1>🚀 AI Resume Analyzer</h1>
          <p>Beat Applicant Tracking Systems with AI-powered resume feedback.</p>

          <div className="hero-features">
            <div className="feature">🤖 AI Powered</div>
            <div className="feature">📄 ATS Analysis</div>
            <div className="feature">⚡ Instant Results</div>
            <div className="feature">💼 Career Tips</div>
          </div>
        </section>

        <form className="resume-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="John Doe"/>

          <label>Target Role</label>
          <input value={targetRole} onChange={e=>setTargetRole(e.target.value)} placeholder="Data Scientist"/>

          <label className="upload-box">
            <input hidden type="file" accept=".pdf" onChange={e=>setResume(e.target.files[0])}/>
            <div>📄</div>
            <strong>{resume?resume.name:"Click to Upload Resume"}</strong>
          </label>

          <button disabled={loading}>{loading?"Analyzing...":"Analyze Resume"}</button>
        </form>

        {analysis && (
          <section className="results">
            <div className="score-card">
              <h2>ATS Score</h2>
              <div className={`score-circle ${cls}`}>
                <div className="score-inner">
                  <h1>{score}</h1>
                  <span>/100</span>
                </div>
              </div>
              <p className="rating">
                {score>=80?"🟢 Excellent Resume":score>=60?"🟡 Good Resume":"🔴 Needs Improvement"}
              </p>
            </div>

            <div className="summary-card">
              <h2>Professional Summary</h2>
              <p>{analysis.professional_summary}</p>
            </div>

            <div className="cards-grid">
              <div className="card strengths">
                <h3>✅ Strengths</h3>
                <ul>{analysis.strengths.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </div>
              <div className="card weaknesses">
                <h3>❌ Weaknesses</h3>
                <ul>{analysis.weaknesses.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </div>
              <div className="card missing">
                <h3>📌 Missing Skills</h3>
                <div className="chips">{analysis.missing_skills.map((x,i)=><span className="chip" key={i}>{x}</span>)}</div>
              </div>
              <div className="card suggestions">
                <h3>💡 Suggestions</h3>
                <ul>{analysis.resume_improvement_suggestions.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </div>
            </div>

            <div className="summary-card">
              <h2>Detected Skills</h2>
              <div className="chips">{analysis.skills_detected.map((x,i)=><span className="chip skill" key={i}>{x}</span>)}</div>
            </div>
          </section>
        )}

        <footer className="footer">
          Made with ❤️ using React + n8n + Gemini AI
        </footer>
      </main>
    </>
  );
}
