import React, { useState } from 'react';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452H17.21v-5.569c0-1.327-.024-3.036-1.85-3.036-1.852 0-2.136 1.446-2.136 2.94v5.665H9.986V9h3.113v1.561h.044c.434-.823 1.492-1.69 3.072-1.69 3.286 0 3.892 2.163 3.892 4.977v6.604zM5.337 7.433a1.808 1.808 0 11.002-3.616 1.808 1.808 0 01-.002 3.616zm1.558 13.019H3.779V9h3.116v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];



function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* Decorative top wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#f9f9f9" />
        </svg>
      </div>

      {/* Divider */}
      <div className="footer-divider" />

      {/* Main Grid */}
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">JC</div>
            <span>Job<span className="footer-logo-accent">Connect</span></span>
          </div>
          <p className="footer-tagline">Your bridge to better opportunities. Connecting talent with top companies across India.</p>
          <div className="footer-contact">
            <a href="mailto:support@jobconnect.com" className="footer-contact-item">
              <span className="fc-icon">✉️</span> support@jobconnect.com
            </a>
            <div className="footer-contact-item">
              <span className="fc-icon">📍</span> Bangalore, India
            </div>
            <div className="footer-contact-item">
              <span className="fc-icon">📞</span> +91 73239 9272XX
            </div>
          </div>
        </div>

        {/* Job Seekers */}
        <div className="footer-col">
          <h4 className="footer-col-title">Job Seekers</h4>
          <ul className="footer-links">
            {['Browse Jobs', 'Apply Now', 'Saved Jobs', 'Career Advice', 'Resume Tips'].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Employers */}
        <div className="footer-col">
          <h4 className="footer-col-title">Employers</h4>
          <ul className="footer-links">
            {['Post a Job', 'Manage Listings', 'Hire Talent', 'Pricing Plans', 'Recruiter Tools'].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div className="footer-col">
          <h4 className="footer-col-title">Stay Updated</h4>
          <p className="footer-newsletter-text">Get the latest job alerts & career tips straight to your inbox.</p>
          {subscribed ? (
            <div className="footer-subscribed">
              ✅ You're subscribed! Thanks.
            </div>
          ) : (
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-subscribe-btn">Subscribe</button>
            </form>
          )}

          {/* Social Icons */}
          <div className="footer-socials">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} className="social-icon-btn" aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-gradient" />
        <div className="footer-bottom-content">
          <p>© 2025 <span className="footer-brand-name">JobConnect</span>. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <p className="footer-credit">Made with <span className="heart">❤</span> by <strong>Vikash Verma</strong></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
