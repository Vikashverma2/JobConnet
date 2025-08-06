import React from 'react';
// import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>JobConnect</h2>
          <p>Your bridge to better opportunities.</p>
          <p className="contact-info">
            📧 support@jobconnect.com<br />
            📍 Bangalore, India
          </p>
        </div>

        <div>
          <h4>Job Seekers</h4>
          <ul>
            <li><a href="#">Browse Jobs</a></li>
            <li><a href="#">Apply</a></li>
            <li><a href="#">Saved Jobs</a></li>
          </ul>
        </div>

        <div>
          <h4>Employers</h4>
          <ul>
            <li><a href="#">Post a Job</a></li>
            <li><a href="#">Manage Jobs</a></li>
            <li><a href="#">Hire Talent</a></li>
          </ul>
        </div>

        <div>
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
          <p className="newsletter-text">Join our newsletter</p>
          <input type="email" placeholder="Your email" className="newsletter-input" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 JobConnect. All rights reserved. Made with <span className="heart">❤</span> by Vikash Verma</p>
      </div>
    </footer>
  );
}

export default Footer;
