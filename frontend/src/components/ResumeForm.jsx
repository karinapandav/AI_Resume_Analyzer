
import { useState } from "react";
import "./ResumeForm.css";

function ResumeForm() {
    const [fullName, setFullName] = useState("");

    const [targetRole, setTargetRole] = useState("");

    const [resume, setResume] = useState(null);

  const handleSubmit = async (event) => {
  event.preventDefault();

  console.log("1. handleSubmit started");

  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("targetRole", targetRole);
  formData.append("resume", resume);

  console.log("2. FormData created");

  try {
    console.log("3. About to call fetch");

    const response = await fetch(
      "http://localhost:5678/webhook-test/analyze-resume",
      {
        method: "POST",
        body: formData,
      }
    );

    console.log("4. Fetch completed");
    console.log("Status:", response.status);

    const analysis = await response.json();

    console.log("Analysis:", analysis);

  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
};
  return (
    
    <form className="resume-form"
    onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Target Job Role</label>
        <input
            type="text"
            placeholder="e.g. Data Scientist"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="resume">Resume (PDF)</label>
        <input
          id="resume"
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>

      <button type="submit">
        Analyze Resume
      </button>
    </form>

    );
}

export default ResumeForm;