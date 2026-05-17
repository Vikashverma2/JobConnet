import React, { useState } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Frontend Developer',
    company: 'Hired at Google India',
    avatar: 'PS',
    avatarColor: '#2d7ef7',
    rating: 5,
    text: `JobConnect completely changed my career trajectory. Within 3 weeks of creating my profile, I had 12 interview calls and landed my dream role at Google. The job matching is incredibly accurate!`,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'DevOps Engineer',
    company: 'Hired at Amazon AWS',
    avatar: 'RV',
    avatarColor: '#f59e0b',
    rating: 5,
    text: `I had been struggling with job hunting for months. JobConnect's curated listings and one-click apply made everything so smooth. Landed a Rs.24L package in under a month. Highly recommend!`,
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    role: 'UI/UX Designer',
    company: 'Hired at Zoho Corp',
    avatar: 'AR',
    avatarColor: '#8b5cf6',
    rating: 5,
    text: `The platform is beautifully designed and the job recommendations are spot on. I loved the real-time application tracking - it kept me informed and confident throughout the process.`,
  },
  {
    id: 4,
    name: 'Kiran Patel',
    role: 'HR Manager',
    company: 'TCS Recruitment Lead',
    avatar: 'KP',
    avatarColor: '#10b981',
    rating: 5,
    text: `As a recruiter, JobConnect saves us enormous time. The candidate quality is outstanding and the filtering tools are excellent. We've reduced our time-to-hire by 40% since switching.`,
  },
  {
    id: 5,
    name: 'Sneha Joshi',
    role: 'Data Analyst',
    company: 'Hired at Mu Sigma',
    avatar: 'SJ',
    avatarColor: '#ef4444',
    rating: 5,
    text: `Fresh out of college and terrified about job hunting. JobConnect made it so easy - the interface is friendly, the listings are genuine, and I got placed within 6 weeks. Life changing!`,
  },
  {
    id: 6,
    name: 'Arjun Mehta',
    role: 'Cloud Architect',
    company: 'Hired at Infosys',
    avatar: 'AM',
    avatarColor: '#0ea5e9',
    rating: 5,
    text: `Top-notch job portal. No spam, no fake listings. The salary transparency feature is a game changer - I knew exactly what to expect before each interview. Absolutely worth it.`,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="star-rating" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? TESTIMONIALS.length - 1 : p - 1));
  const next = () => setActive((p) => (p === TESTIMONIALS.length - 1 ? 0 : p + 1));

  // Show 3 at a time on desktop
  const visible = [
    TESTIMONIALS[active % TESTIMONIALS.length],
    TESTIMONIALS[(active + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(active + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="testimonials-section">
      {/* Background decoration */}
      <div className="testi-bg-circle testi-bg-1" />
      <div className="testi-bg-circle testi-bg-2" />

      {/* Header */}
      <div className="testi-header">
        <div className="testi-label">✦ Success Stories</div>
        <h2 className="testi-title">
          What Our <span className="testi-highlight">Community</span> Says
        </h2>
        <p className="testi-sub">
          Thousands of job seekers and employers trust JobConnect to achieve their goals.
        </p>

        {/* Overall rating */}
        <div className="testi-overall">
          <StarRating count={5} />
          <span className="testi-overall-text">
            <strong>4.9 / 5</strong> based on 12,000+ reviews
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="testi-grid">
        {visible.map((t, i) => (
          <div
            className={`testi-card${i === 1 ? ' testi-card-featured' : ''}`}
            key={t.id}
          >
            {/* Quote icon */}
            <div className="testi-quote">"</div>

            <p className="testi-text">{t.text}</p>

            <StarRating count={t.rating} />

            <div className="testi-author">
              <div
                className="testi-avatar"
                style={{ background: `${t.avatarColor}22`, color: t.avatarColor }}
              >
                {t.avatar}
              </div>
              <div className="testi-author-info">
                <strong className="testi-name">{t.name}</strong>
                <span className="testi-role">{t.role}</span>
                <span className="testi-company">✅ {t.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="testi-nav">
        <button className="testi-nav-btn" onClick={prev} aria-label="Previous">
          ←
        </button>
        <div className="testi-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testi-dot${i === active ? ' testi-dot-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button className="testi-nav-btn" onClick={next} aria-label="Next">
          →
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
