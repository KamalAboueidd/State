import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight, ChevronDown, Layers, Database, Compass } from "lucide-react";
import { TOPIC_CATEGORIES, TOPICS } from "../../content/registry";

export default function Sidebar({ isMobileOpen, closeMobileSidebar }) {
  const location = useLocation();

  // State to track expanded topic groups
  const [expandedGroups, setExpandedGroups] = useState({
    "Zustand": true,
    "Redux Toolkit": true,
    "TanStack React Query": true,
    "RTK Query": true,
    "Roadmap": true,
  });

  const toggleGroup = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  // Group topics by Category -> Group
  const categorizedGroups = TOPIC_CATEGORIES.map((category) => {
    const categoryTopics = TOPICS.filter((t) => t.category === category.id);
    
    // Subdivide by group name (e.g. "Zustand", "Redux Toolkit")
    const groupsMap = {};
    categoryTopics.forEach((topic) => {
      if (!groupsMap[topic.group]) {
        groupsMap[topic.group] = [];
      }
      groupsMap[topic.group].push(topic);
    });

    return {
      category,
      groups: Object.entries(groupsMap).map(([name, topics]) => ({
        name,
        topics,
      })),
    };
  });

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case "foundations":
        return <Compass size={14} className="cat-icon" />;
      case "zustand":
      case "redux":
      case "normalized-state":
        return <Layers size={14} className="cat-icon" />;
      case "react-query":
      case "rtk-query":
        return <Database size={14} className="cat-icon" />;
      default:
        return <Compass size={14} className="cat-icon" />;
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-inner">
          <nav className="sidebar-nav">
            {categorizedGroups.map(({ category, groups }) => (
              <div key={category.id} className="nav-category-section">
                <div className="nav-category-header">
                  {getCategoryIcon(category.id)}
                  <span>{category.name}</span>
                </div>

                <div className="nav-groups-container">
                  {groups.map(({ name, topics }) => {
                    const isExpanded = expandedGroups[name] ?? true;
                    // Check if current route is inside this group
                    const isCurrentGroupActive = topics.some((t) =>
                      location.pathname.includes(t.slug)
                    );

                    return (
                      <div key={name} className="nav-group-item">
                        <button
                          type="button"
                          className={`nav-group-trigger ${isCurrentGroupActive ? "group-active" : ""}`}
                          onClick={() => toggleGroup(name)}
                          aria-expanded={isExpanded}
                        >
                          <span className="nav-group-arrow">
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </span>
                          <span className="nav-group-title">{name}</span>
                          <span className="nav-group-count">{topics.length}</span>
                        </button>

                        {isExpanded && (
                          <div className="nav-subtopics-list">
                            {topics.map((topic) => (
                              <NavLink
                                key={topic.id}
                                to={`/docs/${topic.slug}`}
                                className={({ isActive }) =>
                                  `nav-subtopic-link ${isActive ? "active-link" : ""}`
                                }
                                onClick={closeMobileSidebar}
                              >
                                <span className="link-title">{topic.title}</span>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
