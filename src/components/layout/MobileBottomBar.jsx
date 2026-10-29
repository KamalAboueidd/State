import React from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import ZustandBearIcon from "../common/ZustandBearIcon";

export default function MobileBottomBar({ onOpenSearch, onToggleSidebar, isSidebarOpen }) {
  return (
    <div className="mobile-bottom-bar-wrap">
      <div className="mobile-bottom-pill">
        <Link
          to="/roadmap"
          className="mobile-pill-btn roadmap-pill-btn"
          aria-label="State Roadmap"
        >
          <ZustandBearIcon size={14} />
          <span className="mobile-pill-text">Roadmap</span>
        </Link>

        <span className="mobile-pill-sep" aria-hidden="true" />

        <button
          className="mobile-pill-btn find-btn"
          onClick={onOpenSearch}
          aria-label="Find or search topics"
        >
          <Search size={15} className="mobile-pill-icon" />
          <span className="mobile-pill-text">Find</span>
        </button>

        <span className="mobile-pill-sep" aria-hidden="true" />

        <button
          className="mobile-pill-btn menu-btn"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close navigation sidebar" : "Open navigation sidebar"}
        >
          {isSidebarOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>
    </div>
  );
}
