import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCombinedJobs } from '../../data/JobsData';

const TYPE_FILTERS = ['All', 'Full-time', 'Contract', 'Part-time'];

const categoryIcons = {
  Engineering: '⚙️',
  Design: '🎨',
  QA: '🧪',
  Analytics: '📊',
  Cloud: '☁️',
  'AI / ML': '🤖',
  Support: '🎧',
  Marketing: '📣',
};

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function JobList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [applied, setApplied] = useState(
    () => JSON.parse(localStorage.getItem('appliedJobs')) || []
  );

  const jobsData = getCombinedJobs();

  const handleApply = (id) => {
    const updated = applied.includes(id) ? applied : [...applied, id];
    setApplied(updated);
    localStorage.setItem('appliedJobs', JSON.stringify(updated));
    navigate('/applied-jobs');
  };

  const filtered =
    activeFilter === 'All'
      ? jobsData
      : jobsData.filter((j) => j.type === activeFilter);

  return (
    <section className="job-list-section">
      {/* Section Header */}
      <div className="job-section-header">
        <div className="job-section-label">✦ Opportunities</div>
        <h2 className="job-list-title">
          Featured <span className="jl-highlight">Job Listings</span>
        </h2>
        <p className="job-section-sub">
          Explore top roles from leading companies across India.
        </p>

        {/* Filter Tabs */}
        <div className="job-filter-tabs">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab${activeFilter === f ? ' filter-active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Job Grid */}
      <div className="job-list-grid">
        {filtered.map((job) => (
          <div
            className="job-card"
            key={job.id}
            style={{ '--card-accent': job.color }}
          >
            {/* Card Top */}
            <div className="jc-top">
              <div
                className="company-avatar"
                style={{ background: `${job.color}18`, color: job.color }}
              >
                {getInitials(job.company)}
              </div>
              <div className="jc-meta">
                <span className="jc-company">{job.company}</span>
                <span className="jc-category">
                  {categoryIcons[job.category] || '💼'} {job.category}
                </span>
              </div>
              {job.isNew && <span className="jc-new-badge">New</span>}
            </div>

            {/* Title */}
            <h3 className="job-name">{job.title}</h3>

            {/* Tags */}
            <div className="job-tags">
              <span className="tag tag-location">📍 {job.location}</span>
              <span
                className={`tag tag-type ${job.type === 'Full-time' ? 'tag-fulltime' : job.type === 'Contract' ? 'tag-contract' : 'tag-parttime'}`}
              >
                🕒 {job.type}
              </span>
            </div>

            {/* Description */}
            <p className="job-description">{job.description}</p>

            {/* Salary */}
            <div className="jc-salary">
              <span className="salary-icon">💰</span>
              <span>{job.salary}</span>
            </div>

            {/* Actions */}
            <div className="job-actions">
              <button
                onClick={() => navigate(`/job/${job.id}`)}
                className="btn-details"
              >
                View Details
              </button>
              <button
                onClick={() => handleApply(job.id)}
                className={`btn-apply${applied.includes(job.id) ? ' btn-applied' : ''}`}
                disabled={applied.includes(job.id)}
              >
                {applied.includes(job.id) ? '✓ Applied' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All CTA */}
      <div className="job-view-all">
        <button className="btn-view-all" onClick={() => navigate('/jobs')}>
          View All Jobs &nbsp;→
        </button>
      </div>
    </section>
  );
}

export default JobList;
