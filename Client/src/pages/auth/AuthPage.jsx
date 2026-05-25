import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./AuthPage.css";
import authIllustration from "../../assets/auth-illustration.png";
import { JCLogoIcon } from "../../components/JCLogo";

/* ── Inline SVG icons ─────────────────────────────────────────── */
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 10h.01M8 10h.01M16 10h.01" />
  </svg>
);

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || "/";

  const [isLogin, setIsLogin] = useState(mode !== "signup");
  const [role, setRole] = useState(location.state?.role || "seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "", password: "", confirmPassword: "",
    fullName: "", companyName: "",
  });
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!isLogin) {
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
      if (role === "seeker" && !form.fullName.trim()) e.fullName = "Full name is required";
      if (role === "company" && !form.companyName.trim()) e.companyName = "Company name is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      let userName = "";
      if (isLogin) {
        const prefix = form.email.split('@')[0];
        userName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        if (role === "company" && userName.toLowerCase() === "you") {
          userName = "Acme Corp";
        }
      } else {
        userName = role === "seeker" ? form.fullName : form.companyName;
      }

      localStorage.setItem("jc_user", JSON.stringify({
        email: form.email,
        role,
        name: userName,
      }));

      // Dispatch auth change event to update Navbar instantly
      window.dispatchEvent(new Event("jc_auth_change"));

      setSubmitting(false);
      navigate(returnTo, { replace: true });
    }, 800);
  };

  const switchMode = (login) => { setIsLogin(login); setErrors({}); };

  /* Reusable icon input */
  const Field = ({ id, label, icon, type = "text", value, onChange, placeholder, error, children }) => (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <span className="auth-input-icon">{icon}</span>
        {children || (
          <input id={id} type={type} value={value} onChange={onChange}
            placeholder={placeholder} className={error ? "is-error" : ""} />
        )}
      </div>
      {error && <span className="auth-err">{error}</span>}
    </div>
  );

  const PwField = ({ id, label, show, onToggle, value, onChange, placeholder, error }) => (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <span className="auth-input-icon"><LockIcon /></span>
        <input id={id} type={show ? "text" : "password"} value={value}
          onChange={onChange} placeholder={placeholder}
          className={error ? "is-error" : ""} />
        <button type="button" className="auth-eye" onClick={onToggle}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <span className="auth-err">{error}</span>}
    </div>
  );

  return (
    <div className="auth-page">

      {/* ── LEFT panel ─────────────────────────────────────────── */}
      <div className="auth-panel-left">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />

        <div className="auth-brand">
          <JCLogoIcon size={52} />
          <h2 className="auth-brand-title">JobConnect</h2>
          <p className="auth-brand-sub">
            Trusted by 50,000+ professionals across India
          </p>

          <div className="auth-illus-wrap">
            <img src={authIllustration} alt="JobConnect" className="auth-illus-img" />
          </div>

          <div className="auth-stats">
            <div className="auth-stat"><span>50K+</span><small>Job Seekers</small></div>
            <div className="auth-stat-div" />
            <div className="auth-stat"><span>5K+</span><small>Companies</small></div>
            <div className="auth-stat-div" />
            <div className="auth-stat"><span>98%</span><small>Satisfaction</small></div>
          </div>
        </div>
      </div>

      {/* ── RIGHT panel ────────────────────────────────────────── */}
      <div className="auth-panel-right">
        <Link to="/" className="auth-back-link" title="Back to JobConnect" aria-label="Back to JobConnect">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>

        <div className="auth-card">

          {/* Header */}
          <div className="auth-header">
            <div>
              <h1 className="auth-title">
                {isLogin ? "Welcome back 👋" : "Create account"}
              </h1>
              <p className="auth-subtitle">
                {isLogin ? "Sign in to your account" : "Join JobConnect today"}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? "active" : ""}`} onClick={() => switchMode(true)}>Log In</button>
            <button className={`auth-tab ${!isLogin ? "active" : ""}`} onClick={() => switchMode(false)}>Sign Up</button>
          </div>

          {/* Role toggle — login and signup */}
          <div className="auth-role-toggle">
            <button type="button"
              className={`auth-role-btn ${role === "seeker" ? "active" : ""}`}
              onClick={() => { setRole("seeker"); setErrors({}); }}>
              🧑‍💼 Job Seeker
            </button>
            <button type="button"
              className={`auth-role-btn ${role === "company" ? "active" : ""}`}
              onClick={() => { setRole("company"); setErrors({}); }}>
              🏢 Company
            </button>
          </div>

          {/* Return notice */}
          {returnTo !== "/" && (
            <div className="auth-notice">🔐 Sign in to complete your job application</div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">

            {/* Name field — signup only */}
            {!isLogin && role === "seeker" && (
              <Field id="fullName" label="Full Name" icon={<UserIcon />}
                value={form.fullName} onChange={e => set("fullName", e.target.value)}
                placeholder="Vikash Verma" error={errors.fullName} />
            )}
            {!isLogin && role === "company" && (
              <Field id="companyName" label="Company Name" icon={<BuildingIcon />}
                value={form.companyName} onChange={e => set("companyName", e.target.value)}
                placeholder="Acme Corp" error={errors.companyName} />
            )}

            {/* Email */}
            <Field id="email" label="Email Address" icon={<MailIcon />} type="email"
              value={form.email} onChange={e => set("email", e.target.value)}
              placeholder="you@example.com" error={errors.email} />

            {/* Password */}
            <PwField id="password" label="Password"
              show={showPassword} onToggle={() => setShowPassword(p => !p)}
              value={form.password} onChange={e => set("password", e.target.value)}
              placeholder="Min. 6 characters" error={errors.password} />

            {/* Confirm password — signup only */}
            {!isLogin && (
              <PwField id="confirmPassword" label="Confirm Password"
                show={showConfirm} onToggle={() => setShowConfirm(p => !p)}
                value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)}
                placeholder="Re-enter password" error={errors.confirmPassword} />
            )}

            {/* Forgot */}
            {isLogin && (
              <div className="auth-forgot"><a href="#">Forgot password?</a></div>
            )}

            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting
                ? <span className="auth-spinner" />
                : isLogin ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          {/* Switch */}
          <p className="auth-switch">
            {isLogin
              ? <>No account? <button type="button" onClick={() => switchMode(false)}>Sign up free</button></>
              : <>Have an account? <button type="button" onClick={() => switchMode(true)}>Log in</button></>}
          </p>

          {/* Divider */}
          <div className="auth-divider"><span>or continue with</span></div>

          {/* Social */}
          <div className="auth-social-row">
            <button className="auth-social-btn" type="button">
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="auth-social-btn" type="button">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
