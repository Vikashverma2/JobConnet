import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./AuthPage.css";
import authIllustration from "../../assets/auth-illustration.png";
import trustShield from "../../assets/trust-shield.png";

/* ── Inline SVG icons ───────────────────────────────────────────── */
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ── Field prefix icons ──────────────────────────────────────────── */
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.6 19.79 19.79 0 0 1 1.59 3a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Feature list shown in the left brand panel ─────────────────── */
const FEATURES = [
  { icon: "🔍", text: "Browse thousands of curated jobs" },
  { icon: "🏢", text: "Connect with top hiring companies" },
  { icon: "📄", text: "One-click apply with your profile" },
  { icon: "🔔", text: "Get instant job-match alerts" },
];

/* ── Trust badges shown at the bottom of the left panel ─────────── */
const TRUST_BADGES = [
  { label: "50K+", sublabel: "Professionals" },
  { label: "5K+",  sublabel: "Companies" },
  { label: "98%",  sublabel: "Satisfaction" },
];

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || "/";

  const [isLogin, setIsLogin] = useState(mode !== "signup");
  const [role, setRole] = useState("seeker");       // "seeker" | "company"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ── Form state ────────────────────────────────────────────────── */
  const [form, setForm] = useState({
    email: "", password: "", confirmPassword: "",
    // Job Seeker
    fullName: "", phone: "", city: "", experience: "", skills: "",
    // Hiring Company
    companyName: "", companyWebsite: "", industry: "",
    companySize: "", contactName: "", contactPhone: "",
  });
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  /* ── Validation ────────────────────────────────────────────────── */
  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";

    if (!isLogin) {
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";

      if (role === "seeker") {
        if (!form.fullName.trim())    e.fullName   = "Full name is required";
        if (!form.phone.trim())       e.phone      = "Phone is required";
        if (!form.city.trim())        e.city       = "City is required";
        if (!form.experience)         e.experience = "Select experience level";
        if (!form.skills.trim())      e.skills     = "Add at least one skill";
      } else {
        if (!form.companyName.trim()) e.companyName  = "Company name is required";
        if (!form.industry)           e.industry     = "Select an industry";
        if (!form.companySize)        e.companySize  = "Select company size";
        if (!form.contactName.trim()) e.contactName  = "Contact name is required";
        if (!form.contactPhone.trim())e.contactPhone = "Contact phone is required";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      localStorage.setItem("jc_user", JSON.stringify({
        email: form.email,
        role,
        name: role === "seeker" ? form.fullName : form.companyName,
      }));
      setSubmitting(false);
      navigate(returnTo, { replace: true });
    }, 800);
  };

  const switchMode = (login) => { setIsLogin(login); setErrors({}); };

  /* ── Reusable icon-prefixed input ───────────────────────────────── */
  const IconInput = ({ icon, type = "text", value, onChange, placeholder, hasError, id }) => (
    <div className="auth-icon-input-wrap">
      <span className="auth-input-icon">{icon}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={hasError ? "auth-input-error" : ""}
      />
    </div>
  );

  return (
    <div className="auth-page">

      {/* ── LEFT brand panel ──────────────────────────────────────── */}
      <div className="auth-panel-left">
        {/* Decorative blobs */}
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <div className="auth-blob auth-blob-3" />

        <div className="auth-brand">
          {/* Logo */}
          <div className="auth-brand-logo">
            <span>JC</span>
          </div>
          <h2 className="auth-brand-title">JobConnect</h2>
          <p className="auth-brand-sub">
            Your gateway to the best opportunities — trusted by 50,000+ professionals.
          </p>

          {/* Main Illustration */}
          <div className="auth-illustration-wrap">
            <img src={authIllustration} alt="Professional job seeker" className="auth-illustration" />
          </div>

          {/* Trust shield + badge */}
          <div className="auth-trust-row">
            <img src={trustShield} alt="Trusted & Secure" className="auth-trust-shield" />
            <div className="auth-trust-text">
              <strong>100% Secure & Trusted</strong>
              <span>Your data is protected</span>
            </div>
          </div>

          {/* Feature pill list */}
          <div className="auth-features">
            {FEATURES.map(f => (
              <div className="auth-feature-item" key={f.text}>
                <span className="auth-feature-check"><CheckIcon /></span>
                <span className="auth-feature-emoji">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>

          {/* Trust badges / stats */}
          <div className="auth-stats-row">
            {TRUST_BADGES.map(b => (
              <div className="auth-stat" key={b.label}>
                <span className="auth-stat-num">{b.label}</span>
                <span className="auth-stat-sub">{b.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT form panel ──────────────────────────────────────── */}
      <div className="auth-panel-right">

        {/* Back to site */}
        <Link to="/" className="auth-home-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to JobConnect
        </Link>

        <div className={`auth-card ${!isLogin ? "auth-card-wide" : ""}`}>

          {/* Header with mini shield icon */}
          <div className="auth-header">
            <div className="auth-header-icon-row">
              <img src={trustShield} alt="secure" className="auth-header-mini-shield" />
              <div>
                <h1 className="auth-title">
                  {isLogin ? "Welcome back 👋" : "Create your account"}
                </h1>
                <p className="auth-subtitle">
                  {isLogin
                    ? "Sign in to continue your job journey"
                    : "Join thousands of professionals on JobConnect"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? "auth-tab-active" : ""}`}
              onClick={() => switchMode(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
              Log In
            </button>
            <button className={`auth-tab ${!isLogin ? "auth-tab-active" : ""}`}
              onClick={() => switchMode(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              Sign Up
            </button>
          </div>

          {/* Role picker — sign up only */}
          {!isLogin && (
            <div className="auth-role-picker">
              <p className="auth-role-label">I am a…</p>
              <div className="auth-role-cards">
                <button type="button"
                  className={`auth-role-card ${role === "seeker" ? "auth-role-active" : ""}`}
                  onClick={() => { setRole("seeker"); setErrors({}); }}>
                  <span className="auth-role-icon">🧑‍💼</span>
                  <span className="auth-role-title">Job Seeker</span>
                  <span className="auth-role-desc">Looking for opportunities</span>
                  {role === "seeker" && <span className="auth-role-check"><CheckIcon /></span>}
                </button>
                <button type="button"
                  className={`auth-role-card ${role === "company" ? "auth-role-active" : ""}`}
                  onClick={() => { setRole("company"); setErrors({}); }}>
                  <span className="auth-role-icon">🏢</span>
                  <span className="auth-role-title">Hiring Company</span>
                  <span className="auth-role-desc">Looking to hire talent</span>
                  {role === "company" && <span className="auth-role-check"><CheckIcon /></span>}
                </button>
              </div>
            </div>
          )}

          {/* Return-to-apply notice */}
          {returnTo !== "/" && (
            <div className="auth-return-notice">
              <LockIcon /> Sign in to complete your job application
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>

            {/* ── SEEKER fields ───────────────────────────────────── */}
            {!isLogin && role === "seeker" && (<>
              <div className="auth-field-row">
                <div className="auth-field">
                  <label htmlFor="fullName">Full Name *</label>
                  <IconInput id="fullName" icon={<UserIcon />} value={form.fullName}
                    onChange={e => set("fullName", e.target.value)}
                    placeholder="Vikash Verma" hasError={!!errors.fullName} />
                  {errors.fullName && <span className="auth-err">{errors.fullName}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="phone">Phone *</label>
                  <IconInput id="phone" icon={<PhoneIcon />} type="tel" value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    placeholder="+91 98765 43210" hasError={!!errors.phone} />
                  {errors.phone && <span className="auth-err">{errors.phone}</span>}
                </div>
              </div>
              <div className="auth-field-row">
                <div className="auth-field">
                  <label htmlFor="city">Current City *</label>
                  <IconInput id="city" icon={<MapPinIcon />} value={form.city}
                    onChange={e => set("city", e.target.value)}
                    placeholder="Bengaluru" hasError={!!errors.city} />
                  {errors.city && <span className="auth-err">{errors.city}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="experience">Experience Level *</label>
                  <div className="auth-icon-input-wrap">
                    <span className="auth-input-icon"><BriefcaseIcon /></span>
                    <select id="experience" value={form.experience}
                      onChange={e => set("experience", e.target.value)}
                      className={errors.experience ? "auth-input-error" : ""}>
                      <option value="">Select level</option>
                      {["Fresher (0 yrs)", "1–2 years", "3–5 years", "6–9 years", "10+ years"].map(o =>
                        <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  {errors.experience && <span className="auth-err">{errors.experience}</span>}
                </div>
              </div>
              <div className="auth-field">
                <label htmlFor="skills">Key Skills *</label>
                <IconInput id="skills" icon={<StarIcon />} value={form.skills}
                  onChange={e => set("skills", e.target.value)}
                  placeholder="React, Node.js, Python, SQL…" hasError={!!errors.skills} />
                {errors.skills && <span className="auth-err">{errors.skills}</span>}
                <small className="auth-hint">Separate multiple skills with commas</small>
              </div>
            </>)}

            {/* ── COMPANY fields ──────────────────────────────────── */}
            {!isLogin && role === "company" && (<>
              <div className="auth-field-row">
                <div className="auth-field">
                  <label htmlFor="companyName">Company Name *</label>
                  <IconInput id="companyName" icon={<BuildingIcon />} value={form.companyName}
                    onChange={e => set("companyName", e.target.value)}
                    placeholder="Acme Corp" hasError={!!errors.companyName} />
                  {errors.companyName && <span className="auth-err">{errors.companyName}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="companyWebsite">Company Website</label>
                  <IconInput id="companyWebsite" icon={<GlobeIcon />} type="url" value={form.companyWebsite}
                    onChange={e => set("companyWebsite", e.target.value)}
                    placeholder="https://acmecorp.com" />
                </div>
              </div>
              <div className="auth-field-row">
                <div className="auth-field">
                  <label htmlFor="industry">Industry *</label>
                  <div className="auth-icon-input-wrap">
                    <span className="auth-input-icon"><LayersIcon /></span>
                    <select id="industry" value={form.industry}
                      onChange={e => set("industry", e.target.value)}
                      className={errors.industry ? "auth-input-error" : ""}>
                      <option value="">Select industry</option>
                      {["Technology", "Finance", "Healthcare", "Education", "E-Commerce",
                        "Manufacturing", "Consulting", "Media & Entertainment", "Real Estate", "Other"].map(o =>
                        <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  {errors.industry && <span className="auth-err">{errors.industry}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="companySize">Company Size *</label>
                  <div className="auth-icon-input-wrap">
                    <span className="auth-input-icon"><UsersIcon /></span>
                    <select id="companySize" value={form.companySize}
                      onChange={e => set("companySize", e.target.value)}
                      className={errors.companySize ? "auth-input-error" : ""}>
                      <option value="">Select size</option>
                      {["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"].map(o =>
                        <option key={o} value={`${o} employees`}>{o} employees</option>)}
                    </select>
                  </div>
                  {errors.companySize && <span className="auth-err">{errors.companySize}</span>}
                </div>
              </div>
              <div className="auth-field-row">
                <div className="auth-field">
                  <label htmlFor="contactName">Contact Person *</label>
                  <IconInput id="contactName" icon={<UserIcon />} value={form.contactName}
                    onChange={e => set("contactName", e.target.value)}
                    placeholder="HR Manager" hasError={!!errors.contactName} />
                  {errors.contactName && <span className="auth-err">{errors.contactName}</span>}
                </div>
                <div className="auth-field">
                  <label htmlFor="contactPhone">Contact Phone *</label>
                  <IconInput id="contactPhone" icon={<PhoneIcon />} type="tel" value={form.contactPhone}
                    onChange={e => set("contactPhone", e.target.value)}
                    placeholder="+91 98765 43210" hasError={!!errors.contactPhone} />
                  {errors.contactPhone && <span className="auth-err">{errors.contactPhone}</span>}
                </div>
              </div>
            </>)}

            {/* ── Common: Email ────────────────────────────────────── */}
            <div className="auth-field">
              <label htmlFor="email">Email Address *</label>
              <div className="auth-icon-input-wrap">
                <span className="auth-input-icon"><MailIcon /></span>
                <input id="email" type="email" value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className={errors.email ? "auth-input-error" : ""} />
              </div>
              {errors.email && <span className="auth-err">{errors.email}</span>}
            </div>

            {/* ── Common: Password ─────────────────────────────────── */}
            <div className="auth-field-row">
              <div className="auth-field">
                <label htmlFor="password">Password *</label>
                <div className="auth-pw-wrap auth-icon-input-wrap">
                  <span className="auth-input-icon"><LockIcon /></span>
                  <input id="password" type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={e => set("password", e.target.value)}
                    placeholder="Min. 6 characters"
                    className={errors.password ? "auth-input-error" : ""} />
                  <button type="button" className="auth-eye"
                    onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && <span className="auth-err">{errors.password}</span>}
              </div>
              {!isLogin && (
                <div className="auth-field">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="auth-pw-wrap auth-icon-input-wrap">
                    <span className="auth-input-icon"><LockIcon /></span>
                    <input id="confirmPassword" type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={e => set("confirmPassword", e.target.value)}
                      placeholder="Re-enter password"
                      className={errors.confirmPassword ? "auth-input-error" : ""} />
                    <button type="button" className="auth-eye"
                      onClick={() => setShowConfirm(p => !p)}>
                      {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="auth-err">{errors.confirmPassword}</span>}
                </div>
              )}
            </div>

            {/* Forgot */}
            {isLogin && (
              <div className="auth-forgot">
                <a href="#">Forgot your password?</a>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="auth-submit-btn" disabled={submitting}>
              {submitting
                ? <span className="auth-spinner" />
                : isLogin
                  ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg> Sign In</>)
                  : role === "seeker"
                    ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg> Create Account 🚀</>)
                    : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> Register Company 🏢</>)}
            </button>

            {/* Security note */}
            <div className="auth-security-note">
              <img src={trustShield} alt="secure" className="auth-security-shield-mini" />
              <span>Secured with 256-bit SSL encryption</span>
            </div>
          </form>

          {/* Switch */}
          <p className="auth-switch">
            {isLogin
              ? <>Don't have an account? <button type="button" onClick={() => switchMode(false)}>Sign up free</button></>
              : <>Already have an account? <button type="button" onClick={() => switchMode(true)}>Log in</button></>}
          </p>

          {/* Divider */}
          <div className="auth-divider"><span>or continue with</span></div>

          {/* Social */}
          <div className="auth-social-row">
            <button className="auth-social-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="auth-social-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Continue with LinkedIn
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
