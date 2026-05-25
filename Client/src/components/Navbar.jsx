import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { JCLogoIcon } from "./JCLogo";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Load initial user state
    const loadUser = () => {
      const stored = localStorage.getItem("jc_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse jc_user", e);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Set up a listener for storage events (if changed in other tabs/windows)
    window.addEventListener("storage", loadUser);

    // Custom event listener for local login/logout state changes
    window.addEventListener("jc_auth_change", loadUser);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("jc_auth_change", loadUser);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jc_user");
    setUser(null);
    // Dispatch auth change event so other components know
    window.dispatchEvent(new Event("jc_auth_change"));
    navigate("/");
  };

  const isCompany = user && user.role === "company";
  const isSeeker = user && user.role === "seeker";

  return (
    <header className={`main-header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <JCLogoIcon size={34} />
          <span className="logo">
            Job<span className="logo-accent">Connect</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className={`nav-item ${location.pathname === "/" ? "nav-active" : ""}`}>
            <span className="nav-icon">🏠</span> Home
          </Link>
          <Link to="/jobs" className={`nav-item ${location.pathname === "/jobs" ? "nav-active" : ""}`}>
            <span className="nav-icon">💼</span> Find Jobs
          </Link>
          
          {/* Show "Post a Job" for companies and guest users, hide for seekers */}
          {!isSeeker && (
            <Link
              to="/post-job"
              className={`nav-item ${location.pathname === "/post-job" ? "nav-active" : ""}`}
            >
              <span className="nav-icon">📋</span> Post a Job
            </Link>
          )}

          {/* Show "Applied Jobs" only for Job Seekers */}
          {isSeeker && (
            <Link
              to="/applied-jobs"
              className={`nav-item ${location.pathname === "/applied-jobs" ? "nav-active" : ""}`}
            >
              <span className="nav-icon">📝</span> Applied Jobs
            </Link>
          )}
        </nav>

        {/* Authentication Section */}
        <div className="nav-auth">
          {user ? (
            <div className="nav-profile-badge">
              <span className="nav-avatar">
                {isCompany ? "🏢" : "🧑‍💼"}
              </span>
              <div className="nav-profile-info">
                <span className="nav-profile-name">{user.name}</span>
                <span className="nav-profile-role">
                  {isCompany ? "Employer" : "Candidate"}
                </span>
              </div>
              <button onClick={handleLogout} className="nav-logout-btn" title="Log Out">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-login-btn">
                Login
              </Link>
              <Link to="/signup" className="nav-signup-btn">
                Get Started <span className="btn-arrow">→</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
