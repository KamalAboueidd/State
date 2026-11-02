import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import Footer from "./Footer";
import MobileBottomBar from "./MobileBottomBar";

export default function AppShell() {
  const location = useLocation();

  // Theme state: dark by default, persists in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("directstate_theme") || "dark";
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Scroll to top on route / topic navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const mainArea = document.querySelector(".app-content-area");
    if (mainArea) {
      mainArea.scrollTop = 0;
    }
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("directstate_theme", theme);
  }, [theme]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app-shell">
      {/* 1. Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenSearch={() => {
          setIsMobileSidebarOpen(false);
          setIsSearchOpen(true);
        }}
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={() => {
          setIsSearchOpen(false);
          setIsMobileSidebarOpen((prev) => !prev);
        }}
      />

      <div className="app-body">
        {/* 2. Persistent Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
        />

        {/* 3. Main Content Outlet */}
        <main className="app-content-area">
          <div className="content-container">
            <Outlet />
            <Footer theme={theme} toggleTheme={toggleTheme} />
          </div>
        </main>
      </div>

      {/* 4. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* 5. Mobile Floating Bottom Bar */}
      <MobileBottomBar
        onOpenSearch={() => {
          setIsMobileSidebarOpen(false);
          setIsSearchOpen(true);
        }}
        onToggleSidebar={() => {
          setIsSearchOpen(false);
          setIsMobileSidebarOpen((prev) => !prev);
        }}
        isSidebarOpen={isMobileSidebarOpen}
      />
    </div>
  );
}

