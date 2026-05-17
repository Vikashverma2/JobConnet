import React, { useState } from 'react';

const SEEKER_STEPS = [
  {
    step: '01',
    icon: '📝',
    title: 'Create Your Profile',
    desc: 'Sign up in minutes and build a compelling profile that highlights your skills, experience, and career goals.',
    color: '#2d7ef7',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Discover Opportunities',
    desc: 'Browse thousands of curated job listings filtered by role, location, salary, and company culture.',
    color: '#8b5cf6',
  },
  {
    step: '03',
    icon: '🚀',
    title: 'Apply & Get Hired',
    desc: 'Apply with one click, track your applications in real-time, and land your dream job faster.',
    color: '#10b981',
  },
];

const EMPLOYER_STEPS = [
  {
    step: '01',
    icon: '🏢',
    title: 'Post Your Job',
    desc: 'Create a detailed job listing in minutes. Set requirements, salary range, and target your ideal candidate pool.',
    color: '#2d7ef7',
  },
  {
    step: '02',
    icon: '🎯',
    title: 'Find Top Talent',
    desc: 'Our smart matching surfaces the most qualified candidates based on skills, experience, and fit — saving you hours.',
    color: '#8b5cf6',
  },
  {
    step: '03',
    icon: '🤝',
    title: 'Hire with Confidence',
    desc: 'Review profiles, schedule interviews, and make offers directly through the platform with built-in messaging.',
    color: '#10b981',
  },
];

function HowItWorks() {
  const [active, setActive] = useState('seeker');
  const steps = active === 'seeker' ? SEEKER_STEPS : EMPLOYER_STEPS;

  return (
    <section className="hiw-section">
      {/* Header */}
      <div className="hiw-header">
        <div className="hiw-label">✦ Simple Process</div>
        <h2 className="hiw-title">
          How <span className="hiw-highlight">JobConnect</span> Works
        </h2>
        <p className="hiw-sub">
          Whether you're looking for your next role or hiring the best talent — we make it effortless.
        </p>

        {/* Toggle */}
        <div className="hiw-toggle">
          <button
            className={`hiw-toggle-btn${active === 'seeker' ? ' hiw-toggle-active' : ''}`}
            onClick={() => setActive('seeker')}
          >
            👤 For Job Seekers
          </button>
          <button
            className={`hiw-toggle-btn${active === 'employer' ? ' hiw-toggle-active' : ''}`}
            onClick={() => setActive('employer')}
          >
            🏢 For Employers
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="hiw-steps">
        {steps.map((s, i) => (
          <div className="hiw-step" key={s.step}>
            {/* Connector line (not on last) */}
            {i < steps.length - 1 && <div className="hiw-connector" />}

            <div className="hiw-step-card" style={{ '--step-color': s.color }}>
              <div className="hiw-step-num" style={{ color: s.color }}>
                {s.step}
              </div>
              <div className="hiw-icon-wrap" style={{ background: `${s.color}18`, color: s.color }}>
                <span>{s.icon}</span>
              </div>
              <h3 className="hiw-step-title">{s.title}</h3>
              <p className="hiw-step-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
