import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon-wrap">
          <AlertCircle size={32} />
        </div>
        <h1 className="not-found-title">Topic Not Found</h1>
        <Link to="/docs/zustand" className="not-found-back-btn">
          <ArrowLeft size={14} />
          <span>Return to Documentation</span>
        </Link>
      </div>
    </div>
  );
}
