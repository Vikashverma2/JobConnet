import React, { useState } from "react";
import "./AuthPage.css";

export default function AuthPage({ mode }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h1 className="auth-title">
          Welcome <span className="wave">👋</span>
        </h1>
        <p className="auth-subtitle">
          {isLogin
            ? "Please, enter your details and start your work!"
            : "Create an account to get started!"}
        </p>

        <div className="auth-tabs rounded-tabs">
          <button
            onClick={() => setIsLogin(true)}
            className={`tab ${isLogin ? "active" : ""}`}
          >
            Log in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`tab ${!isLogin ? "active" : ""}`}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
          )}

          <div className="form-group">
            <label>E-mail</label>
            <input type="email" placeholder="johndoe@gmail.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter password" />
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
          )}

          <button type="submit" className="submit-btn gradient-btn">
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="switch-text">
          {isLogin ? (
            <>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setIsLogin(true)}>Log in</button></>
          )}
        </p>
      </div>
    </div>
  );
}
