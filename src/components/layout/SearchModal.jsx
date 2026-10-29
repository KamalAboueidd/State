import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { TOPICS } from "../../content/registry";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Filter topics
  const results = TOPICS.filter((topic) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const titleMatch = topic.title.toLowerCase().includes(q);
    const descMatch = topic.description.toLowerCase().includes(q);
    const groupMatch = topic.group.toLowerCase().includes(q);
    const summaryMatch = topic.summary?.toLowerCase().includes(q);
    return titleMatch || descMatch || groupMatch || summaryMatch;
  });

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (topic) => {
    navigate(`/docs/${topic.slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search size={16} className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search concepts, hooks, middleware, or patterns..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            <X size={16} />
          </button>
        </div>

        <div className="search-modal-body">
          {results.length === 0 ? (
            <div className="search-empty-state">
              <p>No concepts found matching "{query}"</p>
              <span>Try searching for "Zustand", "useQuery", "Reducer", or "Cache"</span>
            </div>
          ) : (
            <div className="search-results-list">
              {results.map((topic, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={topic.id}
                    className={`search-result-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelect(topic)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="search-result-meta">
                      <FileText size={14} className="search-result-icon" />
                      <div className="search-result-text">
                        <div className="search-result-title">
                          <span>{topic.title}</span>
                        </div>
                        <p className="search-result-desc">{topic.description}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="search-result-action">
                        <CornerDownLeft size={12} />
                        <span>Select</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <div className="search-footer-hint">
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </div>
          <div className="search-footer-hint">
            <kbd>↵</kbd> to select
          </div>
          <div className="search-footer-hint">
            <kbd>ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
