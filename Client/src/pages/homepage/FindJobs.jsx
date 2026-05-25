import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCombinedJobs } from '../../data/JobsData';
import Navbar from '../../components/Navbar';

const CATEGORY_ICONS = {
  Engineering: '⚙️', Design: '🎨', QA: '🧪', Analytics: '📊',
  Cloud: '☁️', 'AI / ML': '🤖', Support: '🎧', Marketing: '📣',
  Product: '📦', Security: '🔐', Content: '✍️', Management: '📋',
};

const TYPES      = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];
const CATEGORIES = [
  'All', 'Engineering', 'Design', 'QA', 'Analytics',
  'Cloud', 'AI / ML', 'Support', 'Marketing', 'Product',
  'Security', 'Content', 'Management'
];
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
  const ALL_JOBS = useMemo(() => getCombinedJobs(), []);

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
      <Navbar />

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
