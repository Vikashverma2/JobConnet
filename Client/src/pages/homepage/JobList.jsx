import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const jobsData = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TCS',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    category: 'Engineering',
    salary: '₹8L – ₹12L / yr',
    description: 'Build modern, interactive user interfaces using React.js and cutting-edge web technologies.',
    isNew: true,
    color: '#2d7ef7',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Infosys',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    category: 'Engineering',
    salary: '₹10L – ₹14L / yr',
    description: 'Create scalable backend services using Node.js and Express with cloud deployments.',
    isNew: true,
    color: '#0ea5e9',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Zoho Corp',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    category: 'Design',
    salary: '₹6L – ₹9L / yr',
    description: 'Design intuitive UI layouts, conduct user testing and shape product experiences.',
    isNew: false,
    color: '#8b5cf6',
  },
  {
    id: '4',
    title: 'Software Tester',
    company: 'Wipro',
    location: 'Pune, Maharashtra',
    type: 'Contract',
    category: 'QA',
    salary: '₹4L – ₹7L / yr',
    description: 'Test and ensure quality of enterprise web applications across automated & manual testing.',
    isNew: false,
    color: '#f59e0b',
  },
  {
    id: '5',
    title: 'Data Analyst',
    company: 'Mu Sigma',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    category: 'Analytics',
    salary: '₹5L – ₹8L / yr',
    description: 'Analyze business data, build dashboards and generate actionable insights for stakeholders.',
    isNew: false,
    color: '#10b981',
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Tech Mahindra',
    location: 'Noida, Uttar Pradesh',
    type: 'Full-time',
    category: 'Engineering',
    salary: '₹10L – ₹15L / yr',
    description: 'Manage CI/CD pipelines, automate cloud infrastructure and monitor system performance.',
    isNew: true,
    color: '#ef4444',
  },
  {
    id: '7',
    title: 'Cloud Architect',
    company: 'Amazon AWS India',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    category: 'Cloud',
    salary: '₹20L – ₹30L / yr',
    description: 'Design and architect highly available, scalable cloud solutions on AWS.',
    isNew: true,
    color: '#f97316',
  },
  {
    id: '8',
    title: 'ML Engineer',
    company: 'Google India',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    category: 'AI / ML',
    salary: '₹18L – ₹28L / yr',
    description: 'Build, train and deploy machine learning models that power real-world Google products.',
    isNew: true,
    color: '#6366f1',
  },
  {
    id: '9',
    title: 'Support Engineer',
    company: 'Freshworks',
    location: 'Chennai, Tamil Nadu',
    type: 'Part-time',
    category: 'Support',
    salary: '₹20K – ₹30K / mo',
    description: 'Provide technical support and resolution for SaaS product users globally.',
    isNew: false,
    color: '#14b8a6',
  },
  {
    id: '10',
    title: 'Digital Marketing Executive',
    company: 'DigiMark Agency',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    category: 'Marketing',
    salary: '₹4L – ₹6L / yr',
    description: 'Plan and execute digital campaigns across Google Ads, Meta and organic channels.',
    isNew: false,
    color: '#ec4899',
  },
];

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
