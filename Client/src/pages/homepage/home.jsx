import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from './Footer';
import JobList from './JobList';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import heroBanner from '../../assets/hero-banner.jpeg';

function Home() {
  return (
    <div>
      <Navbar />

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
