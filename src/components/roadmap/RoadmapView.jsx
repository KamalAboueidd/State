import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, RotateCcw } from "lucide-react";
import RoadBearMarker from "./RoadBearMarker";

const ROADMAP_PHASES = [
  {
    id: "phase-foundations",
    phaseNumber: "01",
    tag: "FOUNDATIONS",
    title: "Planning & State Theory",
    slug: "foundations/state-theory",
    description: "Define strict architectural boundaries between Local, Client, and Remote Server state.",
    points: ["Local vs Shared vs Server State", "Direct Subscriptions vs Prop Drilling"],
    // Desktop Coordinates
    roadX: 280,
    roadY: 130,
    side: "left",
    lineStartX: 280,
    lineEndX: 240,
    // Mobile Coordinates (Curved down the left side)
    mobileX: 24,
    mobileY: 70,
  },
  {
    id: "phase-zustand",
    phaseNumber: "02",
    tag: "CLIENT STATE",
    title: "Zustand Core & Slices",
    slug: "zustand",
    description: "Centralized store with zero boilerplate, direct hook selectors, and Immer mutable drafts.",
    points: ["Context-free store hooks", "Store Slices & useShallow memoization"],
    // Desktop Coordinates
    roadX: 720,
    roadY: 370,
    side: "right",
    lineStartX: 720,
    lineEndX: 760,
    // Mobile Coordinates
    mobileX: 56,
    mobileY: 260,
  },
  {
    id: "phase-redux",
    phaseNumber: "03",
    tag: "UNIDIRECTIONAL FLOW",
    title: "Redux Toolkit (RTK)",
    slug: "redux",
    description: "Predictable unidirectional state transitions, createSlice action generation, and async thunks.",
    points: ["configureStore with built-in Thunk", "createSelector memoized computations"],
    // Desktop Coordinates
    roadX: 280,
    roadY: 610,
    side: "left",
    lineStartX: 280,
    lineEndX: 240,
    // Mobile Coordinates
    mobileX: 24,
    mobileY: 450,
  },
  {
    id: "phase-normalized",
    phaseNumber: "04",
    tag: "DATA STRUCTURES",
    title: "Normalized State & O(1) Adapter",
    slug: "redux/entity-adapter-concept",
    description: "Eliminate linear O(N) array search bottlenecks with database-like IDs and entity lookup dictionaries.",
    points: ["12 pre-built CRUD reducer methods", "5 memoized selectors (selectAll, selectById)"],
    // Desktop Coordinates
    roadX: 720,
    roadY: 850,
    side: "right",
    lineStartX: 720,
    lineEndX: 760,
    // Mobile Coordinates
    mobileX: 56,
    mobileY: 640,
  },
  {
    id: "phase-rtk-query",
    phaseNumber: "05",
    tag: "DATA FETCHING",
    title: "RTK Query Isolated API Slice",
    slug: "rtk-query",
    description: "Zero-boilerplate HTTP requests with fetchBaseQuery, automatic hooks, and tag-based cache invalidation.",
    points: ["Auto-generated query & mutation hooks", "Automatic re-fetching via providesTags & invalidatesTags"],
    // Desktop Coordinates
    roadX: 280,
    roadY: 1090,
    side: "left",
    lineStartX: 280,
    lineEndX: 240,
    // Mobile Coordinates
    mobileX: 24,
    mobileY: 830,
  },
  {
    id: "phase-react-query",
    phaseNumber: "06",
    tag: "SERVER ENGINE",
    title: "TanStack React Query",
    slug: "react-query",
    description: "Asynchronous server-state engine: staleTime vs gcTime cache lifecycle, optimistic mutations, and scroll feeds.",
    points: ["Optimistic UI updates with rollback", "Cursor pagination & useInfiniteQuery feeds"],
    // Desktop Coordinates
    roadX: 720,
    roadY: 1330,
    side: "right",
    lineStartX: 720,
    lineEndX: 760,
    // Mobile Coordinates
    mobileX: 56,
    mobileY: 1020,
  },
];

const STORAGE_KEY = "direct_state_roadmap_v4";

export default function RoadmapView() {
  // Guaranteed localStorage loading with safe fallback
  const [roadmapState, setRoadmapState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.completed)) {
          return {
            completed: parsed.completed,
            activeIdx: typeof parsed.activeIdx === "number" ? parsed.activeIdx : 0,
          };
        }
      }
    } catch (e) {
      console.warn("Failed to read roadmap from localStorage:", e);
    }
    return {
      completed: ["phase-foundations"],
      activeIdx: 1,
    };
  });

  const { completed: completedPhases, activeIdx: activePhaseIndex } = roadmapState;

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmapState));
    } catch (e) {
      console.error("Failed to save roadmap to localStorage:", e);
    }
  }, [roadmapState]);

  const togglePhase = (id, idx) => {
    setRoadmapState((prev) => {
      const isAlreadyDone = prev.completed.includes(id);
      const nextCompleted = isAlreadyDone
        ? prev.completed.filter((item) => item !== id)
        : [...prev.completed, id];

      // Auto-advance marker to next uncompleted phase if user just completed this one
      let nextActive = idx;
      if (!isAlreadyDone && idx < ROADMAP_PHASES.length - 1) {
        nextActive = idx + 1;
      }

      return {
        completed: nextCompleted,
        activeIdx: nextActive,
      };
    });
  };

  const markAll = () => {
    setRoadmapState({
      completed: ROADMAP_PHASES.map((p) => p.id),
      activeIdx: ROADMAP_PHASES.length - 1,
    });
  };

  const resetAll = () => {
    setRoadmapState({
      completed: [],
      activeIdx: 0,
    });
  };

  const total = ROADMAP_PHASES.length;
  const doneCount = completedPhases.length;
  const percent = Math.round((doneCount / total) * 100);

  const activePhase = ROADMAP_PHASES[activePhaseIndex] || ROADMAP_PHASES[0];

  return (
    <div className="roadmap-wall-root">
      {/* Header Banner */}
      <header className="roadmap-wall-header">
        <div className="header-eyebrow-row">
          <span className="wall-tag">ROADMAP TIMELINE PROCESS</span>
          <div className="wall-header-controls">
            <button onClick={markAll} className="wall-btn-text" title="Complete all phases">
              Mark All
            </button>
            <span className="wall-sep">•</span>
            <button onClick={resetAll} className="wall-btn-text" title="Reset progress">
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <h1 className="wall-heading">State Management Architecture Roadmap</h1>
        <p className="wall-subheading">
          A step-by-step engineering roadmap from local state to asynchronous server engines.
          Mark phases complete to move the tracker along the road.
        </p>

        {/* Minimal Progress Rail */}
        <div className="wall-progress-row">
          <div className="progress-labels-mono">
            <span>
              {doneCount === total ? "All 6 Phases Completed" : `Phase ${activePhaseIndex + 1} of ${total}`}
            </span>
            <span className="percent-val">{percent}%</span>
          </div>
          <div className="wall-rail">
            <div className="wall-rail-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </header>

      {/* Main Roadmap Area (Responsive for both Desktop & Mobile) */}
      <div className="roadmap-highway-wall">
        
        {/* =========================================================================
            1. DESKTOP ROAD LAYER (Visible on screens > 860px)
           ========================================================================= */}
        <div className="desktop-road-layer">
          <div className="svg-road-layer">
            <svg
              viewBox="0 0 1000 1480"
              className="highway-canvas"
              preserveAspectRatio="xMidYMin meet"
            >
              {/* Asphalt Road Surface */}
              <path
                d="
                  M 280 130
                  C 620 130, 720 240, 720 370
                  C 720 500, 280 480, 280 610
                  C 280 740, 720 720, 720 850
                  C 720 980, 280 960, 280 1090
                  C 280 1220, 720 1200, 720 1330
                "
                className="road-surface"
              />

              {/* White Dashed Centerline */}
              <path
                d="
                  M 280 130
                  C 620 130, 720 240, 720 370
                  C 720 500, 280 480, 280 610
                  C 280 740, 720 720, 720 850
                  C 720 980, 280 960, 280 1090
                  C 280 1220, 720 1200, 720 1330
                "
                className="road-dashed-line"
              />

              {/* Desktop Waypoints & Pointer Lines */}
              {ROADMAP_PHASES.map((phase, idx) => {
                const isDone = completedPhases.includes(phase.id);
                const isActive = activePhaseIndex === idx;

                return (
                  <g key={`dt-pt-${phase.id}`} className="road-point-group">
                    <line
                      x1={phase.roadX}
                      y1={phase.roadY}
                      x2={phase.lineEndX}
                      y2={phase.roadY}
                      className={`road-pointer-line ${isDone ? "line-done" : ""} ${isActive ? "line-active" : ""}`}
                    />
                    <circle
                      cx={phase.roadX}
                      cy={phase.roadY}
                      r={isActive ? 9 : 7}
                      className={`road-pin-circle ${isDone ? "pin-done" : ""} ${isActive ? "pin-active" : ""}`}
                      onClick={() => togglePhase(phase.id, idx)}
                      cursor="pointer"
                    />
                    <circle
                      cx={phase.roadX}
                      cy={phase.roadY}
                      r={isDone ? 3.5 : 2.5}
                      fill={isDone ? "#000000" : "#ffffff"}
                      pointerEvents="none"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Desktop Bear Marker positioned accurately on the road */}
            <div
              className="road-tracker-avatar"
              style={{
                left: `${(activePhase.roadX / 1000) * 100}%`,
                top: `${(activePhase.roadY / 1480) * 100}%`,
              }}
            >
              <RoadBearMarker stepIndex={activePhaseIndex} totalSteps={total} />
            </div>
          </div>

          {/* Desktop Floating Text Blocks */}
          <div className="wall-text-blocks-layer">
            {ROADMAP_PHASES.map((phase, idx) => {
              const isDone = completedPhases.includes(phase.id);
              const isActive = activePhaseIndex === idx;
              const isLeft = phase.side === "left";

              return (
                <div
                  key={`dt-card-${phase.id}`}
                  className={`wall-text-item ${isLeft ? "item-left" : "item-right"} ${
                    isActive ? "item-active" : ""
                  } ${isDone ? "item-done" : ""}`}
                  style={{ top: `${(phase.roadY / 1480) * 100}%` }}
                >
                  <div className="wall-phase-meta">
                    <span className="meta-tag">{phase.tag}</span>
                    <span className="meta-sep">•</span>
                    <span className="meta-num">PHASE {phase.phaseNumber}</span>
                  </div>

                  <h2 className="wall-phase-title">
                    <Link to={`/docs/${phase.slug}`} className="wall-title-link">
                      {phase.title}
                    </Link>
                  </h2>

                  <p className="wall-phase-desc">{phase.description}</p>

                  <div className="wall-action-row">
                    <button
                      type="button"
                      className={`wall-toggle-btn ${isDone ? "is-done" : ""}`}
                      onClick={() => togglePhase(phase.id, idx)}
                    >
                      {isDone ? (
                        <>
                          <Check size={12} className="check-svg" />
                          <span>Done</span>
                        </>
                      ) : (
                        <span>Mark Done</span>
                      )}
                    </button>

                    <Link to={`/docs/${phase.slug}`} className="wall-doc-link">
                      <span>Docs</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            2. MOBILE ROAD LAYER (Visible on screens <= 860px - NEVER HIDDEN!)
           ========================================================================= */}
        <div className="mobile-road-layout">
          {/* Mobile S-curved Winding Highway Canvas */}
          <div className="mobile-svg-road-strip">
            <svg
              viewBox="0 0 80 1140"
              className="mobile-highway-canvas"
              preserveAspectRatio="none"
            >
              {/* Mobile Asphalt Road Surface (Winding along the left) */}
              <path
                d="
                  M 24 70
                  C 56 70, 56 165, 56 260
                  C 56 355, 24 355, 24 450
                  C 24 545, 56 545, 56 640
                  C 56 735, 24 735, 24 830
                  C 24 925, 56 925, 56 1020
                "
                className="road-surface mobile-road-surface"
              />

              {/* Mobile White Dashed Center Line */}
              <path
                d="
                  M 24 70
                  C 56 70, 56 165, 56 260
                  C 56 355, 24 355, 24 450
                  C 24 545, 56 545, 56 640
                  C 56 735, 24 735, 24 830
                  C 24 925, 56 925, 56 1020
                "
                className="road-dashed-line mobile-dashed-line"
              />

              {/* Mobile Waypoint Dots and Pointer Lines */}
              {ROADMAP_PHASES.map((phase, idx) => {
                const isDone = completedPhases.includes(phase.id);
                const isActive = activePhaseIndex === idx;

                return (
                  <g key={`mb-pt-${phase.id}`}>
                    {/* Leader pointer line to text */}
                    <line
                      x1={phase.mobileX}
                      y1={phase.mobileY}
                      x2={78}
                      y2={phase.mobileY}
                      className={`road-pointer-line ${isDone ? "line-done" : ""} ${isActive ? "line-active" : ""}`}
                    />
                    {/* Waypoint circle on road */}
                    <circle
                      cx={phase.mobileX}
                      cy={phase.mobileY}
                      r={isActive ? 8 : 6}
                      className={`road-pin-circle ${isDone ? "pin-done" : ""} ${isActive ? "pin-active" : ""}`}
                      onClick={() => togglePhase(phase.id, idx)}
                      cursor="pointer"
                    />
                    <circle
                      cx={phase.mobileX}
                      cy={phase.mobileY}
                      r={isDone ? 3 : 2}
                      fill={isDone ? "#000000" : "#ffffff"}
                      pointerEvents="none"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Mobile Bear Marker travelling along the road waypoints */}
            <div
              className="road-tracker-avatar mobile-tracker-avatar"
              style={{
                left: `${activePhase.mobileX}px`,
                top: `${activePhase.mobileY}px`,
              }}
            >
              <RoadBearMarker stepIndex={activePhaseIndex} totalSteps={total} />
            </div>
          </div>

          {/* Mobile Floating Text Blocks (Adjacent to the road) */}
          <div className="mobile-text-list">
            {ROADMAP_PHASES.map((phase, idx) => {
              const isDone = completedPhases.includes(phase.id);
              const isActive = activePhaseIndex === idx;

              return (
                <div
                  key={`mb-card-${phase.id}`}
                  className={`mobile-text-card ${isActive ? "item-active" : ""} ${isDone ? "item-done" : ""}`}
                >
                  <div className="wall-phase-meta">
                    <span className="meta-tag">{phase.tag}</span>
                    <span className="meta-sep">•</span>
                    <span className="meta-num">PHASE {phase.phaseNumber}</span>
                  </div>

                  <h2 className="wall-phase-title">
                    <Link to={`/docs/${phase.slug}`} className="wall-title-link">
                      {phase.title}
                    </Link>
                  </h2>

                  <p className="wall-phase-desc">{phase.description}</p>

                  <div className="wall-action-row">
                    <button
                      type="button"
                      className={`wall-toggle-btn ${isDone ? "is-done" : ""}`}
                      onClick={() => togglePhase(phase.id, idx)}
                    >
                      {isDone ? (
                        <>
                          <Check size={12} className="check-svg" />
                          <span>Done</span>
                        </>
                      ) : (
                        <span>Mark Done</span>
                      )}
                    </button>

                    <Link to={`/docs/${phase.slug}`} className="wall-doc-link">
                      <span>Docs</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
