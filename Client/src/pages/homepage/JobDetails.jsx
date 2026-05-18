import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ALL_JOBS from '../../data/jobsData';

const CATEGORY_ICONS = {
  Engineering: '⚙️', Design: '🎨', QA: '🧪', Analytics: '📊',
  Cloud: '☁️', 'AI / ML': '🤖', Support: '🎧', Marketing: '📣',
  Product: '📦', Security: '🔐', Content: '✍️', Management: '📋',
};

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = ALL_JOBS.find(j => j.id === id);

  const [saved, setSaved] = useState(() => {
    const s = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    return s.includes(id);
  });

  const isApplied = (JSON.parse(localStorage.getItem('appliedJobs') || '[]')).includes(id);

  const related = ALL_JOBS.filter(j => j.category === job?.category && j.id !== id).slice(0, 3);

  if (!job) return (
    <div className="jd-not-found">
      <span>🔎</span>
      <h2>Job not found</h2>
      <Link to="/jobs" className="jd-back-link">← Back to Jobs</Link>
    </div>
  );

  const handleSave = () => {
    const saved_ = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const updated = saved_.includes(id) ? saved_.filter(x => x !== id) : [...saved_, id];
    localStorage.setItem('savedJobs', JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <div className="jd-page">
      {/* Navbar */}
      <header className="main-header">
        <div className="container nav-container">
          <Link to="/" className="logo-link">
            <div className="logo-icon">JC</div>
            <span className="logo">Job<span className="logo-accent">Connect</span></span>
          </Link>
          <nav className="nav-links">
            <Link to="/"     className="nav-item">🏠 Home</Link>
            <Link to="/jobs" className="nav-item nav-active">💼 Find Jobs</Link>
            <Link to="/post-job" className="nav-item">📋 Post a Job</Link>
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
          <span>{job.category}</span>
          <span className="jd-bc-sep">›</span>
          <span className="jd-bc-current">{job.title}</span>
        </div>
      </div>

      <div className="jd-body">
        {/* ── Left / Main ── */}
        <div className="jd-main">

          {/* Hero Card */}
          <div className="jd-hero-card" style={{ '--jd-color': job.color }}>
            <div className="jd-hero-top">
              <div className="jd-big-avatar" style={{ background: `${job.color}18`, color: job.color }}>
                {getInitials(job.company)}
              </div>
              <div className="jd-hero-info">
                <h1 className="jd-job-title">{job.title}</h1>
                <p className="jd-company-name">{job.company}</p>
                <div className="jd-meta-tags">
                  <span className="jd-meta-tag">📍 {job.location}</span>
                  <span className="jd-meta-tag">💼 {job.type}</span>
                  <span className="jd-meta-tag">{CATEGORY_ICONS[job.category]} {job.category}</span>
                  <span className="jd-meta-tag">📅 {job.experience}</span>
                  <span className="jd-meta-tag">👥 {job.openings} opening{job.openings > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="jd-hero-footer">
              <div className="jd-salary-box">
                <span className="jd-salary-icon">💰</span>
                <div>
                  <div className="jd-salary-value">{job.salary}</div>
                  <div className="jd-salary-label">Annual CTC</div>
                </div>
              </div>
              <div className="jd-hero-actions">
                <button
                  className={`jd-save-btn${saved ? ' jd-saved' : ''}`}
                  onClick={handleSave}
                >
                  {saved ? '🔖 Saved' : '🔖 Save Job'}
                </button>
                {isApplied ? (
                  <button className="jd-apply-btn jd-applied-btn" disabled>✓ Already Applied</button>
                ) : (
                  <button className="jd-apply-btn" onClick={() => navigate(`/job/${id}/apply`)}>
                    Apply Now →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="jd-section-card">
            <h2 className="jd-section-title">About this Role</h2>
            <p className="jd-description">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="jd-section-card">
            <h2 className="jd-section-title">Requirements</h2>
            <ul className="jd-list">
              {job.requirements.map((r, i) => (
                <li key={i} className="jd-list-item">
                  <span className="jd-list-icon" style={{ color: job.color }}>✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="jd-section-card">
            <h2 className="jd-section-title">Key Responsibilities</h2>
            <ul className="jd-list">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="jd-list-item">
                  <span className="jd-list-icon" style={{ color: job.color }}>→</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="jd-section-card">
            <h2 className="jd-section-title">Benefits & Perks</h2>
            <div className="jd-benefits-grid">
              {job.benefits.map((b, i) => (
                <div className="jd-benefit-chip" key={i} style={{ borderColor: `${job.color}40`, color: job.color }}>
                  <span>🎁</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <aside className="jd-sidebar">
          {/* Quick Apply */}
          <div className="jd-sidebar-card jd-apply-card" style={{ '--jd-color': job.color }}>
            <h3>Ready to Apply?</h3>
            <p>Don't miss out — {job.openings} spot{job.openings > 1 ? 's' : ''} remaining</p>
            {isApplied ? (
              <button className="jd-sidebar-apply jd-applied-btn" disabled>✓ Already Applied</button>
            ) : (
              <button className="jd-sidebar-apply" onClick={() => navigate(`/job/${id}/apply`)}>
                Apply Now →
              </button>
            )}
            <button className={`jd-sidebar-save${saved ? ' jd-saved' : ''}`} onClick={handleSave}>
              {saved ? '🔖 Saved' : '🔖 Save for Later'}
            </button>
          </div>

          {/* Job Summary */}
          <div className="jd-sidebar-card">
            <h3 className="jd-sidebar-title">Job Overview</h3>
            <div className="jd-overview-list">
              {[
                { icon: '🏢', label: 'Company',    value: job.company },
                { icon: '📍', label: 'Location',   value: job.location },
                { icon: '💼', label: 'Job Type',   value: job.type },
                { icon: '📅', label: 'Experience', value: job.experience },
                { icon: '👥', label: 'Openings',   value: `${job.openings} position${job.openings > 1 ? 's' : ''}` },
                { icon: '💰', label: 'Salary',     value: job.salary },
              ].map(item => (
                <div className="jd-overview-row" key={item.label}>
                  <span className="jd-overview-icon">{item.icon}</span>
                  <div>
                    <div className="jd-overview-label">{item.label}</div>
                    <div className="jd-overview-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="jd-sidebar-card">
            <h3 className="jd-sidebar-title">Share this Job</h3>
            <div className="jd-share-btns">
              {['LinkedIn', 'WhatsApp', 'Twitter', 'Copy Link'].map(s => (
                <button key={s} className="jd-share-btn">{s}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Related Jobs */}
      {related.length > 0 && (
        <div className="jd-related">
          <div className="jd-related-inner">
            <h2 className="jd-related-title">Similar Jobs in {job.category}</h2>
            <div className="jd-related-grid">
              {related.map(rj => (
                <Link to={`/job/${rj.id}`} key={rj.id} className="jd-related-card">
                  <div className="jd-rel-avatar" style={{ background: `${rj.color}18`, color: rj.color }}>
                    {getInitials(rj.company)}
                  </div>
                  <div className="jd-rel-info">
                    <div className="jd-rel-title">{rj.title}</div>
                    <div className="jd-rel-company">{rj.company} · {rj.location.split(',')[0]}</div>
                    <div className="jd-rel-salary">{rj.salary}</div>
                  </div>
                  <span className={`jd-rel-type jd-type-${rj.type.toLowerCase().replace('-','').replace(' ','')}`}>{rj.type}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}