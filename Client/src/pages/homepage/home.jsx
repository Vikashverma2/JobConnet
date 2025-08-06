import React from 'react';
// import './Home.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import JobList from './JobList';

function Home() {
  return (
    <div>
      {/* Header */}
      <header className="main-header">
        <div className="container nav-container">
          <h2 className="logo">JobConnect</h2>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Find Jobs</Link>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/signup" className="btn-filled">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Connect with Opportunities. Connect with <span className="highlight">Talent</span>.</h1>
          <p>Your professional gateway to career growth and hiring success.</p>
          <div className="hero-buttons">
            <Link to="/jobs" className="btn-filled">Find Jobs</Link>
            <Link to="/post-job" className="btn-outline">Post a Job</Link>
          </div>
        </div>
      </section>

        <div className='job-list'>
            <JobList/>
        </div>

      {/* Footer */}
        <Footer/>
    </div>
  );
}

export default Home;
