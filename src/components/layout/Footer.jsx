import React from "react";
import { Sun, Moon } from "lucide-react";

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Footer({ theme, toggleTheme }) {
  return (
    <footer className="global-page-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-title">Direct State</p>
          <p className="footer-desc">
            State Management Engineering & Architecture Reference
          </p>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/KamalAboueidd/DirectState-_Management-"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            title="GitHub Repository"
          >
            <GithubIcon size={14} />
            <span>GitHub Repository</span>
          </a>

          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="footer-theme-btn"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
