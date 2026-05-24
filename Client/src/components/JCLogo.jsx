/**
 * JobConnect — Shared logo/icon components
 * Use <JCLogoIcon /> for just the icon tile
 * Use <JCLogo />     for icon + wordmark inline
 */

import React from "react";

/* ── Inline SVG icon (the briefcase badge) ── */
export const JCLogoIcon = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <defs>
      <linearGradient id="jc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="jc-shine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Rounded tile background */}
    <rect width="64" height="64" rx="14" fill="url(#jc-bg)" />
    <rect width="64" height="64" rx="14" fill="url(#jc-shine)" />
    {/* Briefcase body */}
    <rect x="12" y="26" width="40" height="26" rx="5" fill="#ffffff" fillOpacity="0.95" />
    {/* Briefcase handle */}
    <path
      d="M23 26 L23 21 Q23 17 27 17 L37 17 Q41 17 41 21 L41 26"
      fill="none"
      stroke="#ffffff"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Center clasp */}
    <rect x="28" y="35" width="8" height="6" rx="2" fill="url(#jc-bg)" />
  </svg>
);

/* ── Full logo: icon + wordmark ── */
export const JCLogo = ({ size = 36, textClass = "" }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
    <JCLogoIcon size={size} />
    <span className={textClass}>
      Job<span style={{ color: "var(--color-primary, #6366f1)" }}>Connect</span>
    </span>
  </span>
);
