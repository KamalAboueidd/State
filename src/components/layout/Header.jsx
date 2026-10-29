import React from "react";
import { Link } from "react-router-dom";
import { Search, Moon, Sun, Menu, X } from "lucide-react";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Header({
  theme,
  toggleTheme,
  onOpenSearch,
  isMobileSidebarOpen,
  toggleMobileSidebar,
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileSidebar}
          aria-label={isMobileSidebarOpen ? "Close navigation" : "Open navigation"}
        >
          {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <Link to="/docs/zustand" className="brand-logo">
          <span className="brand-name">Direct State</span>
        </Link>
      </div>

      <div className="header-center">
        <button
          className="search-trigger-btn"
          onClick={onOpenSearch}
          aria-label="Search documentation (Press Ctrl+K)"
        >
          <Search size={14} className="search-icon" />
          <span className="search-placeholder">Search concepts, docs, APIs...</span>
          <kbd className="search-kbd">Ctrl K</kbd>
        </button>
      </div>

      <div className="header-right">
        <a
          href="https://github.com/KamalAboueidd/DirectState-_Management-"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link-btn"
          aria-label="GitHub Repository"
          title="KamalAboueidd/DirectState-_Management-"
        >
          <GithubIcon size={16} />
          <span className="hide-on-mobile">GitHub</span>
        </a>

        <button
          onClick={toggleTheme}
          className="header-icon-btn"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
