import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ── shared data ── */
const ALL_JOBS = [
  { id: '1',  title: 'Frontend Developer',          company: 'TCS',               location: 'Bengaluru, Karnataka',    type: 'Full-time',  category: 'Engineering', salary: '₹8L – ₹12L / yr',   salaryMin: 800000,  description: 'Build modern, interactive user interfaces using React.js and cutting-edge web technologies.', color: '#2d7ef7' },
  { id: '2',  title: 'Backend Developer',            company: 'Infosys',           location: 'Hyderabad, Telangana',    type: 'Full-time',  category: 'Engineering', salary: '₹10L – ₹14L / yr',  salaryMin: 1000000, description: 'Create scalable backend services using Node.js and Express with cloud deployments.',           color: '#0ea5e9' },
  { id: '3',  title: 'UI/UX Designer',               company: 'Zoho Corp',         location: 'Chennai, Tamil Nadu',     type: 'Full-time',  category: 'Design',      salary: '₹6L – ₹9L / yr',    salaryMin: 600000,  description: 'Design intuitive UI layouts, conduct user testing and shape product experiences.',               color: '#8b5cf6' },
  { id: '4',  title: 'Software Tester',              company: 'Wipro',             location: 'Pune, Maharashtra',       type: 'Contract',   category: 'QA',          salary: '₹4L – ₹7L / yr',    salaryMin: 400000,  description: 'Test and ensure quality of enterprise web applications across automated & manual testing.',       color: '#f59e0b' },
  { id: '5',  title: 'Data Analyst',                 company: 'Mu Sigma',          location: 'Bengaluru, Karnataka',    type: 'Full-time',  category: 'Analytics',   salary: '₹5L – ₹8L / yr',    salaryMin: 500000,  description: 'Analyze business data, build dashboards and generate actionable insights for stakeholders.',       color: '#10b981' },
  { id: '6',  title: 'DevOps Engineer',              company: 'Tech Mahindra',     location: 'Noida, Uttar Pradesh',    type: 'Full-time',  category: 'Engineering', salary: '₹10L – ₹15L / yr',  salaryMin: 1000000, description: 'Manage CI/CD pipelines, automate cloud infrastructure and monitor system performance.',           color: '#ef4444' },
  { id: '7',  title: 'Cloud Architect',              company: 'Amazon AWS India',  location: 'Hyderabad, Telangana',    type: 'Full-time',  category: 'Cloud',       salary: '₹20L – ₹30L / yr',  salaryMin: 2000000, description: 'Design and architect highly available, scalable cloud solutions on AWS.',                       color: '#f97316' },
  { id: '8',  title: 'ML Engineer',                  company: 'Google India',      location: 'Bengaluru, Karnataka',    type: 'Full-time',  category: 'AI / ML',     salary: '₹18L – ₹28L / yr',  salaryMin: 1800000, description: 'Build, train and deploy machine learning models that power real-world Google products.',          color: '#6366f1' },
  { id: '9',  title: 'Support Engineer',             company: 'Freshworks',        location: 'Chennai, Tamil Nadu',     type: 'Part-time',  category: 'Support',     salary: '₹20K – ₹30K / mo',  salaryMin: 240000,  description: 'Provide technical support and resolution for SaaS product users globally.',                     color: '#14b8a6' },
  { id: '10', title: 'Digital Marketing Executive',  company: 'DigiMark Agency',   location: 'Mumbai, Maharashtra',     type: 'Full-time',  category: 'Marketing',   salary: '₹4L – ₹6L / yr',    salaryMin: 400000,  description: 'Plan and execute digital campaigns across Google Ads, Meta and organic channels.',                color: '#ec4899' },
  { id: '11', title: 'React Native Developer',       company: 'PhonePe',           location: 'Bengaluru, Karnataka',    type: 'Full-time',  category: 'Engineering', salary: '₹12L – ₹18L / yr',  salaryMin: 1200000, description: 'Build and maintain cross-platform mobile applications using React Native.',                       color: '#2d7ef7' },
  { id: '12', title: 'Product Manager',              company: 'Flipkart',          location: 'Bengaluru, Karnataka',    type: 'Full-time',  category: 'Product',     salary: '₹15L – ₹22L / yr',  salaryMin: 1500000, description: 'Drive product strategy, roadmap and execution for India\'s largest e-commerce platform.',        color: '#8b5cf6' },
  { id: '13', title: 'Cybersecurity Analyst',        company: 'HCL Technologies',  location: 'Noida, Uttar Pradesh',    type: 'Full-time',  category: 'Security',    salary: '₹8L – ₹13L / yr',   salaryMin: 800000,  description: 'Monitor, detect and respond to security threats across enterprise networks and systems.',          color: '#ef4444' },
  { id: '14', title: 'Technical Writer',             company: 'Atlassian India',   location: 'Pune, Maharashtra',       type: 'Remote',     category: 'Content',     salary: '₹6L – ₹10L / yr',   salaryMin: 600000,  description: 'Create clear, concise developer documentation, guides and API references.',                      color: '#10b981' },
  { id: '15', title: 'Scrum Master',                 company: 'Capgemini',         location: 'Mumbai, Maharashtra',     type: 'Full-time',  category: 'Management',  salary: '₹10L – ₹16L / yr',  salaryMin: 1000000, description: 'Facilitate agile ceremonies and coach teams to deliver high-quality software iteratively.',       color: '#f59e0b' },
  { id: '16', title: 'iOS Developer',                company: 'Paytm',             location: 'Noida, Uttar Pradesh',    type: 'Full-time',  category: 'Engineering', salary: '₹14L – ₹20L / yr',  salaryMin: 1400000, description: 'Design and build advanced applications for the iOS platform using Swift.',                       color: '#0ea5e9' },
];

const CATEGORY_ICONS = {
  Engineering: '⚙️', Design: '🎨', QA: '🧪', Analytics: '📊',
  Cloud: '☁️', 'AI / ML': '🤖', Support: '🎧', Marketing: '📣',
  Product: '📦', Security: '🔐', Content: '✍️', Management: '📋',
};

const TYPES      = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];
const CATEGORIES = ['All', ...Array.from(new Set(ALL_JOBS.map(j => j.category)))];
const SALARY_RANGES = [
  { label: 'Any Salary',     min: 0 },
  { label: 'Up to ₹6L',     min: 0,       max: 600000 },
  { label: '₹6L – ₹12L',   min: 600000,  max: 1200000 },
  { label: '₹12L – ₹20L',  min: 1200000, max: 2000000 },
  { label: '₹20L+',         min: 2000000  },
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function FindJobs() {
  const navigate = useNavigate();

  const [keyword,  setKeyword]  = useState('');
  const [location, setLocation] = useState('');
  const [type,     setType]     = useState('All');
  const [category, setCategory] = useState('All');
  const [salaryIdx,setSalaryIdx]= useState(0);
  const [sortBy,   setSortBy]   = useState('relevance');
  const [applied,  setApplied]  = useState(() => JSON.parse(localStorage.getItem('appliedJobs')) || []);

  /* ── search + filter logic ── */
  const results = useMemo(() => {
    let list = ALL_JOBS;

    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      list = list.filter(j =>
        j.title.toLowerCase().includes(kw) ||
        j.company.toLowerCase().includes(kw) ||
        j.category.toLowerCase().includes(kw) ||
        j.description.toLowerCase().includes(kw)
      );
    }
    if (location.trim()) {
      const loc = location.toLowerCase();
      list = list.filter(j => j.location.toLowerCase().includes(loc));
    }
    if (type !== 'All')     list = list.filter(j => j.type === type);
    if (category !== 'All') list = list.filter(j => j.category === category);

    const range = SALARY_RANGES[salaryIdx];
    if (range.min > 0 || range.max) {
      list = list.filter(j =>
        j.salaryMin >= range.min && (range.max == null || j.salaryMin <= range.max)
      );
    }

    if (sortBy === 'salary-high') list = [...list].sort((a, b) => b.salaryMin - a.salaryMin);
    if (sortBy === 'salary-low')  list = [...list].sort((a, b) => a.salaryMin - b.salaryMin);
    if (sortBy === 'company')     list = [...list].sort((a, b) => a.company.localeCompare(b.company));

    return list;
  }, [keyword, location, type, category, salaryIdx, sortBy]);

  const handleApply = (id) => {
    if (!applied.includes(id)) {
      const updated = [...applied, id];
      setApplied(updated);
      localStorage.setItem('appliedJobs', JSON.stringify(updated));
    }
  };

  const clearFilters = () => {
    setKeyword(''); setLocation(''); setType('All');
    setCategory('All'); setSalaryIdx(0); setSortBy('relevance');
  };

  return (
    <div className="fj-page">
      {/* ── Navbar ── */}
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

      {/* ── Hero Search Banner ── */}
      <section className="fj-hero">
        <div className="fj-hero-text">
          <h1>Find Your <span className="fj-hero-accent">Dream Job</span></h1>
          <p>Search from {ALL_JOBS.length}+ live openings across top companies in India</p>
        </div>

        <div className="fj-search-box">
          <div className="fj-search-field">
            <span className="fj-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Job title, company, or keyword…"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="fj-input"
            />
          </div>
          <div className="fj-search-divider" />
          <div className="fj-search-field">
            <span className="fj-search-icon">📍</span>
            <input
              type="text"
              placeholder="City or state…"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="fj-input"
            />
          </div>
          <button className="fj-search-btn">Search Jobs</button>
        </div>

        {/* Quick tags */}
        <div className="fj-popular-tags">
          <span className="fj-tag-label">Trending:</span>
          {['React', 'Cloud', 'ML Engineer', 'Remote', 'Product'].map(t => (
            <button key={t} className="fj-tag-chip" onClick={() => setKeyword(t)}>{t}</button>
          ))}
        </div>
      </section>

      {/* ── Body: Sidebar + Grid ── */}
      <div className="fj-body">

        {/* Sidebar Filters */}
        <aside className="fj-sidebar">
          <div className="fj-sidebar-header">
            <h3>Filters</h3>
            <button className="fj-clear-btn" onClick={clearFilters}>Clear All</button>
          </div>

          {/* Job Type */}
          <div className="fj-filter-group">
            <h4 className="fj-filter-label">Job Type</h4>
            {TYPES.map(t => (
              <label key={t} className="fj-radio-row">
                <input
                  type="radio"
                  name="type"
                  value={t}
                  checked={type === t}
                  onChange={() => setType(t)}
                  className="fj-radio"
                />
                <span>{t}</span>
                <span className="fj-radio-count">
                  ({t === 'All' ? ALL_JOBS.length : ALL_JOBS.filter(j => j.type === t).length})
                </span>
              </label>
            ))}
          </div>

          {/* Category */}
          <div className="fj-filter-group">
            <h4 className="fj-filter-label">Category</h4>
            <div className="fj-category-list">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`fj-cat-btn${category === c ? ' fj-cat-active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c !== 'All' && <span>{CATEGORY_ICONS[c]}</span>} {c}
                </button>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="fj-filter-group">
            <h4 className="fj-filter-label">Salary Range</h4>
            {SALARY_RANGES.map((r, i) => (
              <label key={r.label} className="fj-radio-row">
                <input
                  type="radio"
                  name="salary"
                  checked={salaryIdx === i}
                  onChange={() => setSalaryIdx(i)}
                  className="fj-radio"
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Results Panel */}
        <main className="fj-results">
          {/* Results bar */}
          <div className="fj-results-bar">
            <p className="fj-results-count">
              <strong>{results.length}</strong> job{results.length !== 1 ? 's' : ''} found
              {keyword && <span className="fj-kw-badge"> for "{keyword}"</span>}
            </p>
            <div className="fj-sort-wrap">
              <label className="fj-sort-label">Sort by:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="fj-sort-select">
                <option value="relevance">Relevance</option>
                <option value="salary-high">Salary: High → Low</option>
                <option value="salary-low">Salary: Low → High</option>
                <option value="company">Company A–Z</option>
              </select>
            </div>
          </div>

          {/* Active filters chips */}
          {(type !== 'All' || category !== 'All' || salaryIdx !== 0) && (
            <div className="fj-active-chips">
              {type !== 'All'     && <span className="fj-chip">{type} <button onClick={() => setType('All')}>×</button></span>}
              {category !== 'All' && <span className="fj-chip">{category} <button onClick={() => setCategory('All')}>×</button></span>}
              {salaryIdx !== 0    && <span className="fj-chip">{SALARY_RANGES[salaryIdx].label} <button onClick={() => setSalaryIdx(0)}>×</button></span>}
            </div>
          )}

          {/* Job Cards */}
          {results.length === 0 ? (
            <div className="fj-empty">
              <span className="fj-empty-icon">🔎</span>
              <h3>No jobs found</h3>
              <p>Try different keywords or clear your filters.</p>
              <button className="fj-clear-all-btn" onClick={clearFilters}>Clear All Filters</button>
            </div>
          ) : (
            <div className="fj-grid">
              {results.map(job => (
                <div className="fj-card" key={job.id} style={{ '--card-accent': job.color }}>
                  {/* Top row */}
                  <div className="fj-card-top">
                    <div className="fj-avatar" style={{ background: `${job.color}18`, color: job.color }}>
                      {getInitials(job.company)}
                    </div>
                    <div className="fj-card-meta">
                      <span className="fj-company">{job.company}</span>
                      <span className="fj-cat">{CATEGORY_ICONS[job.category]} {job.category}</span>
                    </div>
                    <span className={`fj-type-badge fj-type-${job.type.toLowerCase().replace('-','').replace(' ','')}`}>
                      {job.type}
                    </span>
                  </div>

                  <h3 className="fj-title">{job.title}</h3>

                  <div className="fj-tags">
                    <span className="fj-tag fj-tag-loc">📍 {job.location}</span>
                  </div>

                  <p className="fj-desc">{job.description}</p>

                  <div className="fj-salary">
                    <span>💰</span> {job.salary}
                  </div>

                  <div className="fj-actions">
                    <button className="fj-btn-details" onClick={() => navigate(`/job/${job.id}`)}>
                      View Details
                    </button>
                    <button
                      className={`fj-btn-apply${applied.includes(job.id) ? ' fj-applied' : ''}`}
                      onClick={() => handleApply(job.id)}
                      disabled={applied.includes(job.id)}
                    >
                      {applied.includes(job.id) ? '✓ Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
