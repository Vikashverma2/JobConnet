import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ALL_JOBS from '../../data/jobsData';

const STEPS = ['Personal Info', 'Experience', 'Resume & Cover Letter', 'Review'];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function JobApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = ALL_JOBS.find(j => j.id === id);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', city: '',
    currentRole: '', experience: '', currentSalary: '', noticePeriod: '',
    linkedin: '', portfolio: '',
    resumeName: '', coverLetter: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  if (!job) return (
    <div className="jd-not-found">
      <span>🔎</span><h2>Job not found</h2>
      <Link to="/jobs" className="jd-back-link">← Back to Jobs</Link>
    </div>
  );

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim())  e.lastName  = 'Required';
      if (!form.email.trim())     e.email     = 'Required';
      if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
      if (!form.phone.trim())     e.phone     = 'Required';
      if (!form.city.trim())      e.city      = 'Required';
    }
    if (step === 1) {
      if (!form.experience)    e.experience    = 'Required';
      if (!form.noticePeriod)  e.noticePeriod  = 'Required';
    }
    if (step === 2) {
      if (!form.resumeName)   e.resumeName   = 'Please upload your resume';
      if (!form.coverLetter.trim()) e.coverLetter = 'Please write a cover letter';
    }
    if (step === 3 && !form.agreeTerms) e.agreeTerms = 'You must agree to proceed';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (!validateStep()) return;
    const applied = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    if (!applied.includes(id)) {
      localStorage.setItem('appliedJobs', JSON.stringify([...applied, id]));
    }
    setSubmitted(true);
  };

  // ── Success screen ──
  if (submitted) return (
    <div className="apply-page">
      <header className="main-header">
        <div className="container nav-container">
          <Link to="/" className="logo-link">
            <div className="logo-icon">JC</div>
            <span className="logo">Job<span className="logo-accent">Connect</span></span>
          </Link>
        </div>
      </header>
      <div className="apply-success">
        <div className="apply-success-icon">🎉</div>
        <h2>Application Submitted!</h2>
        <p>Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been received. We'll notify you about the next steps.</p>
        <div className="apply-success-actions">
          <button className="apply-success-btn-primary" onClick={() => navigate('/jobs')}>Browse More Jobs</button>
          <button className="apply-success-btn-outline" onClick={() => navigate(`/job/${id}`)}>View Job Details</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="apply-page">
      {/* Navbar */}
      <header className="main-header">
        <div className="container nav-container">
          <Link to="/" className="logo-link">
            <div className="logo-icon">JC</div>
            <span className="logo">Job<span className="logo-accent">Connect</span></span>
          </Link>
          <nav className="nav-links">
            <Link to="/"     className="nav-item">🏠 Home</Link>
            <Link to="/jobs" className="nav-item">💼 Find Jobs</Link>
          </nav>
          <div className="nav-auth">
            <Link to="/login"  className="nav-login-btn">Login</Link>
            <Link to="/signup" className="nav-signup-btn">Get Started <span className="btn-arrow">→</span></Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="jd-breadcrumb">
        <div className="jd-breadcrumb-inner">
          <Link to="/jobs">Find Jobs</Link>
          <span className="jd-bc-sep">›</span>
          <Link to={`/job/${id}`}>{job.title}</Link>
          <span className="jd-bc-sep">›</span>
          <span className="jd-bc-current">Apply</span>
        </div>
      </div>

      <div className="apply-body">
        {/* Left: Job Info Panel */}
        <aside className="apply-job-info">
          <div className="apply-job-card" style={{ '--jd-color': job.color }}>
            <div className="apply-job-avatar" style={{ background: `${job.color}18`, color: job.color }}>
              {getInitials(job.company)}
            </div>
            <h3 className="apply-job-title">{job.title}</h3>
            <p className="apply-job-company">{job.company}</p>
            <div className="apply-job-tags">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>💰 {job.salary}</span>
              <span>📅 {job.experience}</span>
            </div>
          </div>

          {/* Tips */}
          <div className="apply-tips-card">
            <h4 className="apply-tips-title">💡 Application Tips</h4>
            <ul className="apply-tips-list">
              <li>Tailor your cover letter to this specific role</li>
              <li>Highlight relevant experience prominently</li>
              <li>Keep your resume to 1–2 pages</li>
              <li>Double-check all contact details before submitting</li>
            </ul>
          </div>
        </aside>

        {/* Right: Multi-step Form */}
        <div className="apply-form-area">
          {/* Step Indicator */}
          <div className="apply-steps">
            {STEPS.map((label, i) => (
              <div key={label} className={`apply-step-item${i <= step ? ' apply-step-active' : ''}${i < step ? ' apply-step-done' : ''}`}>
                <div className="apply-step-circle">
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="apply-step-label">{label}</span>
                {i < STEPS.length - 1 && <div className={`apply-step-line${i < step ? ' apply-line-done' : ''}`} />}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="apply-form-card">
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <div className="apply-form-section">
                <h2 className="apply-form-title">Personal Information</h2>
                <p className="apply-form-sub">Tell us about yourself</p>
                <div className="apply-grid-2">
                  <div className="apply-field">
                    <label>First Name *</label>
                    <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Vikash" className={errors.firstName ? 'input-error' : ''} />
                    {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                  </div>
                  <div className="apply-field">
                    <label>Last Name *</label>
                    <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Verma" className={errors.lastName ? 'input-error' : ''} />
                    {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                  </div>
                  <div className="apply-field">
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" className={errors.email ? 'input-error' : ''} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="apply-field">
                    <label>Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" className={errors.phone ? 'input-error' : ''} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  <div className="apply-field apply-field-full">
                    <label>Current City *</label>
                    <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Bengaluru, Karnataka" className={errors.city ? 'input-error' : ''} />
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </div>
                  <div className="apply-field">
                    <label>LinkedIn Profile</label>
                    <input value={form.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
                  </div>
                  <div className="apply-field">
                    <label>Portfolio / Website</label>
                    <input value={form.portfolio} onChange={e => set('portfolio', e.target.value)} placeholder="yourportfolio.com" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Experience */}
            {step === 1 && (
              <div className="apply-form-section">
                <h2 className="apply-form-title">Work Experience</h2>
                <p className="apply-form-sub">Help us understand your background</p>
                <div className="apply-grid-2">
                  <div className="apply-field">
                    <label>Current Job Title</label>
                    <input value={form.currentRole} onChange={e => set('currentRole', e.target.value)} placeholder="e.g. Software Developer" />
                  </div>
                  <div className="apply-field">
                    <label>Total Experience *</label>
                    <select value={form.experience} onChange={e => set('experience', e.target.value)} className={errors.experience ? 'input-error' : ''}>
                      <option value="">Select experience</option>
                      {['Fresher (0 years)', '1 year', '2 years', '3 years', '4 years', '5 years', '6–8 years', '9–12 years', '12+ years'].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.experience && <span className="field-error">{errors.experience}</span>}
                  </div>
                  <div className="apply-field">
                    <label>Current / Last Salary</label>
                    <input value={form.currentSalary} onChange={e => set('currentSalary', e.target.value)} placeholder="e.g. ₹8L per annum" />
                  </div>
                  <div className="apply-field">
                    <label>Notice Period *</label>
                    <select value={form.noticePeriod} onChange={e => set('noticePeriod', e.target.value)} className={errors.noticePeriod ? 'input-error' : ''}>
                      <option value="">Select notice period</option>
                      {['Immediate', '15 days', '1 month', '2 months', '3 months', 'More than 3 months'].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.noticePeriod && <span className="field-error">{errors.noticePeriod}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Resume & Cover Letter */}
            {step === 2 && (
              <div className="apply-form-section">
                <h2 className="apply-form-title">Resume & Cover Letter</h2>
                <p className="apply-form-sub">Upload your resume and write a compelling cover letter</p>

                {/* Resume upload */}
                <div className="apply-upload-area"
                  onClick={() => document.getElementById('resume-input').click()}
                >
                  <input
                    id="resume-input" type="file" accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={e => set('resumeName', e.target.files[0]?.name || '')}
                  />
                  {form.resumeName ? (
                    <div className="apply-upload-done">
                      <span className="apply-upload-file-icon">📄</span>
                      <div>
                        <div className="apply-upload-filename">{form.resumeName}</div>
                        <div className="apply-upload-change">Click to change</div>
                      </div>
                    </div>
                  ) : (
                    <div className="apply-upload-placeholder">
                      <span className="apply-upload-icon">☁️</span>
                      <div className="apply-upload-text">Drag & drop or <span>browse</span></div>
                      <div className="apply-upload-hint">PDF, DOC or DOCX · Max 5MB</div>
                    </div>
                  )}
                </div>
                {errors.resumeName && <span className="field-error">{errors.resumeName}</span>}

                {/* Cover letter */}
                <div className="apply-field apply-cover-field">
                  <label>Cover Letter *</label>
                  <textarea
                    value={form.coverLetter}
                    onChange={e => set('coverLetter', e.target.value)}
                    rows={7}
                    placeholder={`Dear Hiring Manager,\n\nI am excited to apply for the ${job.title} role at ${job.company}...`}
                    className={errors.coverLetter ? 'input-error' : ''}
                  />
                  <div className="apply-char-count">{form.coverLetter.length} / 2000 characters</div>
                  {errors.coverLetter && <span className="field-error">{errors.coverLetter}</span>}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="apply-form-section">
                <h2 className="apply-form-title">Review Your Application</h2>
                <p className="apply-form-sub">Please confirm everything looks correct before submitting</p>

                <div className="apply-review-grid">
                  <div className="apply-review-section">
                    <h4>Personal Details</h4>
                    <div className="apply-review-row"><span>Name</span><strong>{form.firstName} {form.lastName}</strong></div>
                    <div className="apply-review-row"><span>Email</span><strong>{form.email}</strong></div>
                    <div className="apply-review-row"><span>Phone</span><strong>{form.phone}</strong></div>
                    <div className="apply-review-row"><span>City</span><strong>{form.city}</strong></div>
                    {form.linkedin && <div className="apply-review-row"><span>LinkedIn</span><strong>{form.linkedin}</strong></div>}
                  </div>
                  <div className="apply-review-section">
                    <h4>Experience</h4>
                    {form.currentRole   && <div className="apply-review-row"><span>Current Role</span><strong>{form.currentRole}</strong></div>}
                    <div className="apply-review-row"><span>Experience</span><strong>{form.experience}</strong></div>
                    <div className="apply-review-row"><span>Notice Period</span><strong>{form.noticePeriod}</strong></div>
                    {form.currentSalary && <div className="apply-review-row"><span>Current Salary</span><strong>{form.currentSalary}</strong></div>}
                  </div>
                  <div className="apply-review-section apply-review-full">
                    <h4>Documents</h4>
                    <div className="apply-review-row"><span>Resume</span><strong>📄 {form.resumeName || 'Not uploaded'}</strong></div>
                    <div className="apply-review-row apply-review-cover"><span>Cover Letter</span><strong>{form.coverLetter.slice(0, 120)}{form.coverLetter.length > 120 ? '…' : ''}</strong></div>
                  </div>
                </div>

                <label className="apply-agree-row">
                  <input type="checkbox" checked={form.agreeTerms} onChange={e => set('agreeTerms', e.target.checked)} />
                  <span>I confirm all information is accurate and agree to JobConnect's <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>.</span>
                </label>
                {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
              </div>
            )}

            {/* Navigation */}
            <div className="apply-nav">
              {step > 0 && (
                <button className="apply-nav-back" onClick={back}>← Back</button>
              )}
              <div style={{ flex: 1 }} />
              {step < STEPS.length - 1 ? (
                <button className="apply-nav-next" style={{ '--jd-color': job.color }} onClick={next}>
                  Next: {STEPS[step + 1]} →
                </button>
              ) : (
                <button className="apply-nav-submit" style={{ '--jd-color': job.color }} onClick={handleSubmit}>
                  Submit Application 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
