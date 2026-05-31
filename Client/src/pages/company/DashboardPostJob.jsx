import React, { useState } from "react";
import "./CompanyDashboard.css"; // We will add specific form styles here later

const CATEGORIES = [
  "Engineering", "Design", "QA", "Analytics", "Cloud", 
  "AI / ML", "Support", "Marketing", "Product", 
  "Security", "Content", "Management"
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const EXP_LEVELS = ["Fresher", "1-3 Years", "3-5 Years", "5-8 Years", "8+ Years"];

export default function DashboardPostJob({ companyId, companyName, onJobPosted, onCancel }) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    category: "Engineering",
    location: "",
    type: "Full-time",
    workMode: "Remote",
    experience: "1-3 Years",
    openings: 1,
    salary: "",
    salaryMin: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    skills: ""
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.location.trim()) e.location = "Job location is required";
    if (!form.salary.trim()) e.salary = "Salary range is required";
    if (!form.salaryMin || isNaN(Number(form.salaryMin))) {
      e.salaryMin = "Minimum salary number is required for sorting";
    }
    if (!form.description.trim()) e.description = "Job description is required";
    if (!form.requirements.trim()) e.requirements = "Please add at least one requirement";
    if (!form.skills.trim()) e.skills = "Please list some key skills";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    
    const randomColors = ["#2d7ef7", "#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#f97316"];
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

    const jobPayload = {
      title: form.title.trim(),
      company: companyName,
      companyId: companyId,
      location: form.location.trim(),
      type: form.type,
      workMode: form.workMode,
      category: form.category,
      salary: form.salary.trim(),
      salaryMin: Number(form.salaryMin),
      experience: form.experience,
      openings: Number(form.openings),
      color: randomColor,
      description: form.description.trim(),
      requirements: form.requirements.split("\n").map(r => r.trim()).filter(Boolean),
      responsibilities: form.responsibilities.split("\n").map(r => r.trim()).filter(Boolean),
      benefits: form.benefits.split("\n").map(r => r.trim()).filter(Boolean),
      skills: form.skills.split(",").map(r => r.trim()).filter(Boolean),
      isNew: true
    };

    try {
      const res = await fetch("http://localhost:5190/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPayload)
      });

      if (res.ok) {
        const createdJob = await res.json();
        onJobPosted(createdJob); // Call parent callback
      } else {
        const errData = await res.json();
        console.error("Failed to create job", errData);
        alert(errData.message || "Failed to post job");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error occurred while posting the job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="post-job-view">
      <div className="applications-header">
        <div>
          <h2>Post a New Job</h2>
          <p style={{ color: 'var(--color-text-subtle)', marginTop: '4px' }}>
            Provide full information about the position to attract the best candidates.
          </p>
        </div>
        <button className="back-btn" onClick={onCancel} type="button">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="post-job-form">
        <div className="form-section">
          <h3>Basic Details</h3>
          <div className="form-grid-3">
            <div className="profile-group">
              <label>Job Title *</label>
              <input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="e.g. Senior Frontend Developer" />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            <div className="profile-group">
              <label>Category *</label>
              <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="profile-group">
              <label>Location *</label>
              <input type="text" value={form.location} onChange={e => handleChange('location', e.target.value)} placeholder="e.g. Bengaluru, Karnataka" />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>
            <div className="profile-group">
              <label>Job Type *</label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)}>
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="profile-group">
              <label>Work Mode *</label>
              <select value={form.workMode} onChange={e => handleChange('workMode', e.target.value)}>
                {WORK_MODES.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div className="profile-group">
              <label>Experience *</label>
              <select value={form.experience} onChange={e => handleChange('experience', e.target.value)}>
                {EXP_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="profile-group">
              <label>No. of Openings *</label>
              <input type="number" min="1" value={form.openings} onChange={e => handleChange('openings', e.target.value)} />
            </div>
            <div className="profile-group">
              <label>Salary Range *</label>
              <input type="text" value={form.salary} onChange={e => handleChange('salary', e.target.value)} placeholder="e.g. ₹10L - ₹15L / yr" />
              {errors.salary && <span className="error-text">{errors.salary}</span>}
            </div>
            <div className="profile-group">
              <label>Minimum Salary (Numeric) *</label>
              <input type="number" value={form.salaryMin} onChange={e => handleChange('salaryMin', e.target.value)} placeholder="e.g. 1000000" />
              {errors.salaryMin && <span className="error-text">{errors.salaryMin}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Full Information</h3>
          
          <div className="profile-group">
            <label>Key Skills (Comma separated) *</label>
            <input type="text" value={form.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="e.g. React, Node.js, AWS, MongoDB" />
            {errors.skills && <span className="error-text">{errors.skills}</span>}
          </div>

          <div className="profile-group">
            <label>About the Role (Description) *</label>
            <textarea rows="4" value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Describe the role in detail..."></textarea>
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="profile-group">
            <label>Requirements (One per line) *</label>
            <textarea rows="4" value={form.requirements} onChange={e => handleChange('requirements', e.target.value)} placeholder="e.g.&#10;3+ years of experience in React&#10;Strong understanding of CSS"></textarea>
            {errors.requirements && <span className="error-text">{errors.requirements}</span>}
          </div>

          <div className="profile-group">
            <label>Responsibilities (One per line)</label>
            <textarea rows="4" value={form.responsibilities} onChange={e => handleChange('responsibilities', e.target.value)} placeholder="e.g.&#10;Develop user-facing features&#10;Build reusable code and libraries"></textarea>
          </div>

          <div className="profile-group">
            <label>Benefits & Perks (One per line)</label>
            <textarea rows="3" value={form.benefits} onChange={e => handleChange('benefits', e.target.value)} placeholder="e.g.&#10;Health Insurance&#10;Gym Membership"></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={submitting}>
            {submitting ? 'Publishing...' : 'Publish Job Listing 🚀'}
          </button>
        </div>
      </form>
    </div>
  );
}
