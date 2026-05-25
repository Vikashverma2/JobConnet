import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./PostJob.css";

const CATEGORIES = [
  "Engineering",
  "Design",
  "QA",
  "Analytics",
  "Cloud",
  "AI / ML",
  "Support",
  "Marketing",
  "Product",
  "Security",
  "Content",
  "Management"
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote"];

export default function PostJob() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newJobId, setNewJobId] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    category: "Engineering",
    location: "",
    type: "Full-time",
    experience: "1–3 Years",
    openings: 1,
    salary: "",
    salaryMin: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("jc_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing user", e);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
    window.addEventListener("jc_auth_change", checkUser);
    return () => window.removeEventListener("jc_auth_change", checkUser);
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.location.trim()) e.location = "Job location is required (e.g. Bengaluru, Karnataka)";
    if (!form.salary.trim()) e.salary = "Salary description is required (e.g. ₹8L – ₹12L / yr)";
    if (!form.salaryMin || isNaN(Number(form.salaryMin))) {
      e.salaryMin = "Minimum salary number is required for sorting/filtering";
    }
    if (!form.description.trim() || form.description.length < 50) {
      e.description = "Please enter a detailed description (min. 50 characters)";
    }
    if (!form.requirements.trim()) e.requirements = "Please add at least one requirement";
    if (!form.responsibilities.trim()) e.responsibilities = "Please add at least one responsibility";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setTimeout(() => {
      const storedJobs = JSON.parse(localStorage.getItem("jc_jobs") || "[]");
      
      const randomColors = ["#2d7ef7", "#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#f97316", "#6366f1", "#14b8a6", "#ec4899"];
      const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      
      const jobId = Date.now().toString();

      const newJob = {
        id: jobId,
        title: form.title.trim(),
        company: user?.name || "My Company",
        location: form.location.trim(),
        type: form.type,
        category: form.category,
        salary: form.salary.trim(),
        salaryMin: Number(form.salaryMin),
        experience: form.experience.trim(),
        openings: Number(form.openings) || 1,
        color: randomColor,
        description: form.description.trim(),
        requirements: form.requirements.split("\n").map(r => r.trim()).filter(Boolean),
        responsibilities: form.responsibilities.split("\n").map(r => r.trim()).filter(Boolean),
        benefits: form.benefits.split("\n").map(r => r.trim()).filter(Boolean),
        isNew: true
      };

      storedJobs.unshift(newJob);
      localStorage.setItem("jc_jobs", JSON.stringify(storedJobs));
      
      setNewJobId(jobId);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setForm({
        title: "",
        category: "Engineering",
        location: "",
        type: "Full-time",
        experience: "1–3 Years",
        openings: 1,
        salary: "",
        salaryMin: "",
        description: "",
        requirements: "",
        responsibilities: "",
        benefits: ""
      });
    }, 1200);
  };

  const handleSwitchToCompany = () => {
    localStorage.removeItem("jc_user");
    window.dispatchEvent(new Event("jc_auth_change"));
    navigate("/signup", { state: { role: "company", returnTo: "/post-job" } });
  };

  if (loading) {
    return (
      <div className="pj-loading-container">
        <div className="pj-spinner" />
        <p>Verifying credentials...</p>
      </div>
    );
  }

  return (
    <div className="pj-page">
      <Navbar />

      <main className="pj-main-content">
        
        {/* CASE 1: GUEST VIEW */}
        {!user && (
          <div className="pj-guest-container">
            <div className="pj-guest-hero">
              <div className="pj-badge">EMPLOYER PORTAL</div>
              <h1>Find Your Next <span className="pj-gradient-text">Superstar</span></h1>
              <p className="pj-subtitle">
                Post your job opening to India's most active professional community and get matched with top qualified talent.
              </p>
              
              <div className="pj-stats-grid">
                <div className="pj-stat-card">
                  <h3>50K+</h3>
                  <p>Active Job Seekers</p>
                </div>
                <div className="pj-stat-card">
                  <h3>5K+</h3>
                  <p>Hiring Companies</p>
                </div>
                <div className="pj-stat-card">
                  <h3>24h</h3>
                  <p>Avg. Response Time</p>
                </div>
              </div>
            </div>

            <div className="pj-guest-action-card">
              <h2>Ready to start hiring?</h2>
              <p>Please log in or register as a company to publish job listings.</p>
              
              <div className="pj-guest-buttons">
                <Link
                  to="/signup"
                  state={{ role: "company", returnTo: "/post-job" }}
                  className="pj-btn pj-btn-filled"
                >
                  Create Company Account
                </Link>
                <Link
                  to="/login"
                  state={{ role: "company", returnTo: "/post-job" }}
                  className="pj-btn pj-btn-outline"
                >
                  Log In as Company
                </Link>
              </div>

              <div className="pj-benefits-list">
                <div className="pj-benefit-item">
                  <span className="pj-benefit-check">✓</span>
                  <span>Unlimited premium job posts</span>
                </div>
                <div className="pj-benefit-item">
                  <span className="pj-benefit-check">✓</span>
                  <span>Instant candidate matching & resume reviews</span>
                </div>
                <div className="pj-benefit-item">
                  <span className="pj-benefit-check">✓</span>
                  <span>Beautiful employer dashboard page</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CASE 2: CANDIDATE / SEEKER ACCESS DENIED VIEW */}
        {user && user.role === "seeker" && (
          <div className="pj-seeker-warning-card">
            <div className="pj-warning-icon">🔐</div>
            <h2>Employer Only Access</h2>
            <p>
              You are currently logged in as a <strong>Job Seeker ({user.name})</strong>. Candidate accounts are not authorized to post jobs.
            </p>
            <div className="pj-warning-actions">
              <button onClick={() => navigate("/")} className="pj-btn pj-btn-outline">
                Back to Home Page
              </button>
              <button onClick={handleSwitchToCompany} className="pj-btn pj-btn-filled">
                Switch to Employer Account
              </button>
            </div>
            <p className="pj-warning-subnote">
              Note: Switching accounts will log you out of your candidate profile.
            </p>
          </div>
        )}

        {/* CASE 3: COMPANY VIEW */}
        {user && user.role === "company" && (
          <div className="pj-form-container">
            {success ? (
              <div className="pj-success-card">
                <div className="pj-success-icon-wrap">🎉</div>
                <h2>Job Listing Published!</h2>
                <p>
                  Your job post has been published under <strong>{user.name}</strong>. It is now live and searchable on the platform.
                </p>
                <div className="pj-success-buttons">
                  <button
                    onClick={() => navigate(`/job/${newJobId}`)}
                    className="pj-btn pj-btn-filled"
                  >
                    View Live Job Detail
                  </button>
                  <button onClick={() => setSuccess(false)} className="pj-btn pj-btn-outline">
                    Post Another Job
                  </button>
                </div>
              </div>
            ) : (
              <div className="pj-form-card">
                <div className="pj-form-header">
                  <h2>Post a New Job Opening</h2>
                  <p>Publish an opening instantly to get applications from verified candidates.</p>
                </div>

                <form onSubmit={handleSubmit} className="pj-form">
                  <div className="pj-form-section">
                    <h3>Basic Information</h3>
                    <div className="pj-grid-2">
                      <div className="pj-field">
                        <label htmlFor="title">Job Title *</label>
                        <input
                          id="title"
                          type="text"
                          value={form.title}
                          onChange={e => handleChange("title", e.target.value)}
                          placeholder="e.g. Senior Frontend Developer"
                          className={errors.title ? "pj-input-err" : ""}
                        />
                        {errors.title && <span className="pj-error-text">{errors.title}</span>}
                      </div>

                      <div className="pj-field">
                        <label htmlFor="category">Category *</label>
                        <select
                          id="category"
                          value={form.category}
                          onChange={e => handleChange("category", e.target.value)}
                        >
                          {CATEGORIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="pj-field">
                        <label htmlFor="location">Job Location *</label>
                        <input
                          id="location"
                          type="text"
                          value={form.location}
                          onChange={e => handleChange("location", e.target.value)}
                          placeholder="e.g. Bengaluru, Karnataka (or Remote)"
                          className={errors.location ? "pj-input-err" : ""}
                        />
                        {errors.location && <span className="pj-error-text">{errors.location}</span>}
                      </div>

                      <div className="pj-field">
                        <label htmlFor="type">Job Type *</label>
                        <select
                          id="type"
                          value={form.type}
                          onChange={e => handleChange("type", e.target.value)}
                        >
                          {JOB_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pj-form-section">
                    <h3>Experience & Salary Details</h3>
                    <div className="pj-grid-3">
                      <div className="pj-field">
                        <label htmlFor="experience">Experience Level *</label>
                        <input
                          id="experience"
                          type="text"
                          value={form.experience}
                          onChange={e => handleChange("experience", e.target.value)}
                          placeholder="e.g. 2–5 Years"
                        />
                      </div>

                      <div className="pj-field">
                        <label htmlFor="openings">No. of Openings</label>
                        <input
                          id="openings"
                          type="number"
                          min="1"
                          value={form.openings}
                          onChange={e => handleChange("openings", e.target.value)}
                        />
                      </div>

                      <div className="pj-field">
                        <label htmlFor="salary">Salary Range *</label>
                        <input
                          id="salary"
                          type="text"
                          value={form.salary}
                          onChange={e => handleChange("salary", e.target.value)}
                          placeholder="e.g. ₹10L – ₹14L / yr"
                          className={errors.salary ? "pj-input-err" : ""}
                        />
                        {errors.salary && <span className="pj-error-text">{errors.salary}</span>}
                      </div>
                    </div>

                    <div className="pj-field max-w-sm">
                      <label htmlFor="salaryMin">Minimum Salary (Numbers Only) *</label>
                      <input
                        id="salaryMin"
                        type="number"
                        value={form.salaryMin}
                        onChange={e => handleChange("salaryMin", e.target.value)}
                        placeholder="e.g. 1000000 (For ₹10L)"
                        className={errors.salaryMin ? "pj-input-err" : ""}
                      />
                      <span className="pj-hint-text">Used for search filters and ordering</span>
                      {errors.salaryMin && <span className="pj-error-text">{errors.salaryMin}</span>}
                    </div>
                  </div>

                  <div className="pj-form-section">
                    <h3>Role Details & Requirements</h3>
                    
                    <div className="pj-field">
                      <label htmlFor="description">About the Role *</label>
                      <textarea
                        id="description"
                        rows="5"
                        value={form.description}
                        onChange={e => handleChange("description", e.target.value)}
                        placeholder="Provide an overview of the role, team, and day-to-day operations..."
                        className={errors.description ? "pj-input-err" : ""}
                      />
                      {errors.description && <span className="pj-error-text">{errors.description}</span>}
                    </div>

                    <div className="pj-field">
                      <label htmlFor="requirements">Key Requirements * <span className="pj-label-hint">(Enter each requirement on a new line)</span></label>
                      <textarea
                        id="requirements"
                        rows="4"
                        value={form.requirements}
                        onChange={e => handleChange("requirements", e.target.value)}
                        placeholder="e.g.&#10;3+ years of React experience&#10;Familiarity with Redux Toolkit&#10;Strong communication skills"
                        className={errors.requirements ? "pj-input-err" : ""}
                      />
                      {errors.requirements && <span className="pj-error-text">{errors.requirements}</span>}
                    </div>

                    <div className="pj-field">
                      <label htmlFor="responsibilities">Responsibilities * <span className="pj-label-hint">(Enter each responsibility on a new line)</span></label>
                      <textarea
                        id="responsibilities"
                        rows="4"
                        value={form.responsibilities}
                        onChange={e => handleChange("responsibilities", e.target.value)}
                        placeholder="e.g.&#10;Develop new UI features&#10;Optimize performance for mobile&#10;Collaborate with product designers"
                        className={errors.responsibilities ? "pj-input-err" : ""}
                      />
                      {errors.responsibilities && <span className="pj-error-text">{errors.responsibilities}</span>}
                    </div>

                    <div className="pj-field">
                      <label htmlFor="benefits">Benefits & Perks <span className="pj-label-hint">(Enter each benefit on a new line - Optional)</span></label>
                      <textarea
                        id="benefits"
                        rows="3"
                        value={form.benefits}
                        onChange={e => handleChange("benefits", e.target.value)}
                        placeholder="e.g.&#10;Full family health insurance&#10;Flexible WFH policy&#10;Gym reimbursement"
                      />
                    </div>
                  </div>

                  <div className="pj-form-footer">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="pj-btn pj-btn-filled pj-submit-btn"
                    >
                      {submitting ? (
                        <>
                          <span className="pj-spinner-small" /> Publishing...
                        </>
                      ) : (
                        "Publish Job Listing 🚀"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
