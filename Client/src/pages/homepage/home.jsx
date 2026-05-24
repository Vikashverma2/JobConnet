import React, { useEffect, useState } from 'react';
// import './Home.css';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import JobList from './JobList';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import heroBanner from '../../assets/hero-banner.jpeg';
import { JCLogoIcon } from '../../components/JCLogo';

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* Header */}
      <header className={`main-header${scrolled ? ' header-scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <JCLogoIcon size={34} />
            <span className="logo">Job<span className="logo-accent">Connect</span></span>
          </Link>

          {/* Nav Links */}
          <nav className="nav-links">
            <Link to="/" className={`nav-item${location.pathname === '/' ? ' nav-active' : ''}`}>
              <span className="nav-icon">🏠</span> Home
            </Link>
            <Link to="/jobs" className={`nav-item${location.pathname === '/jobs' ? ' nav-active' : ''}`}>
              <span className="nav-icon">💼</span> Find Jobs
            </Link>
            <Link to="/post-job" className={`nav-item${location.pathname === '/post-job' ? ' nav-active' : ''}`}>
              <span className="nav-icon">📋</span> Post a Job
            </Link>
          </nav>

          {/* Auth */}
          <div className="nav-auth">
            <Link to="/login" className="nav-login-btn">Login</Link>
            <Link to="/signup" className="nav-signup-btn">
              Get Started <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🚀 #1 Job Platform</div>
          <h1>Connect with Opportunities. Connect with <span className="highlight">Talent</span>.</h1>
          <p>Your professional gateway to career growth and hiring success. Join thousands of professionals finding their dream jobs.</p>
          <div className="hero-stats">
            <div className="stat-item"><strong>50K+</strong><span>Jobs Listed</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><strong>20K+</strong><span>Companies</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><strong>200K+</strong><span>Job Seekers</span></div>
          </div>
          <div className="hero-cta-buttons">
            <Link to="/jobs" className="btn-filled">Find Jobs</Link>
            <Link to="/post-job" className="btn-outline">Post a Job</Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroBanner} alt="People using JobConnect platform" className="hero-banner-img" />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Job Listings */}
      <div className='job-list'>
          <JobList/>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
        <Footer/>
    </div>
  );
}

export default Home;
