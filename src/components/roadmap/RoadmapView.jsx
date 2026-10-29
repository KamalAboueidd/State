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
    // Waypoint on the curved road (Left side)
    roadX: 280,
    roadY: 130,
    side: "left", // Text placed on the left: x: 20 -> 240
    lineStartX: 280,
    lineEndX: 240,
  },
  {
    id: "phase-zustand",
    phaseNumber: "02",
    tag: "CLIENT STATE",
    title: "Zustand Core & Slices",
    slug: "zustand",
    description: "Centralized store with zero boilerplate, direct hook selectors, and Immer mutable drafts.",
    points: ["Context-free store hooks", "Store Slices & useShallow memoization"],
    // Waypoint on the curved road (Right side)
    roadX: 720,
    roadY: 370,
    side: "right", // Text placed on the right: x: 760 -> 980
    lineStartX: 720,
    lineEndX: 760,
  },
  {
    id: "phase-redux",
    phaseNumber: "03",
    tag: "UNIDIRECTIONAL FLOW",
    title: "Redux Toolkit (RTK)",
    slug: "redux",
    description: "Predictable unidirectional state transitions, createSlice action generation, and async thunks.",
    points: ["configureStore with built-in Thunk", "createSelector memoized computations"],
    // Waypoint on the curved road (Left side)
    roadX: 280,
    roadY: 610,
    side: "left",
    lineStartX: 280,
    lineEndX: 240,
  },
  {
    id: "phase-normalized",
    phaseNumber: "04",
    tag: "DATA STRUCTURES",
    title: "Normalized State & O(1) Adapter",
    slug: "redux/entity-adapter-concept",
    description: "Eliminate linear O(N) array search bottlenecks with database-like IDs and entity lookup dictionaries.",
    points: ["12 pre-built CRUD reducer methods", "5 memoized selectors (selectAll, selectById)"],
    // Waypoint on the curved road (Right side)
    roadX: 720,
    roadY: 850,
    side: "right",
    lineStartX: 720,
    lineEndX: 760,
  },
  {
    id: "phase-rtk-query",
    phaseNumber: "05",
    tag: "DATA FETCHING",
    title: "RTK Query Isolated API Slice",
    slug: "rtk-query",
    description: "Zero-boilerplate HTTP requests with fetchBaseQuery, automatic hooks, and tag-based cache invalidation.",
    points: ["Auto-generated query & mutation hooks", "Automatic re-fetching via providesTags & invalidatesTags"],
    // Waypoint on the curved road (Left side)
    roadX: 280,
    roadY: 1090,
    side: "left",
    lineStartX: 280,
    lineEndX: 240,
  },
  {
    id: "phase-react-query",
    phaseNumber: "06",
    tag: "SERVER ENGINE",
    title: "TanStack React Query",
    slug: "react-query",
    description: "Asynchronous server-state engine: staleTime vs gcTime cache lifecycle, optimistic mutations, and scroll feeds.",
    points: ["Optimistic UI updates with rollback", "Cursor pagination & useInfiniteQuery feeds"],
    // Waypoint on the curved road (Right side)
    roadX: 720,
    roadY: 1330,
    side: "right",
    lineStartX: 720,
    lineEndX: 760,
  },
];

const STORAGE_KEY = "direct_state_roadmap_wall_v2";

export default function RoadmapView() {
  const [completedPhases, setCompletedPhases] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ["phase-foundations"];
    } catch {
      return ["phase-foundations"];
    }
  });

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedPhases));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, [completedPhases]);

  // Keep marker on first uncompleted phase or the latest one
  useEffect(() => {
    const nextPending = ROADMAP_PHASES.findIndex((p) => !completedPhases.includes(p.id));
    if (nextPending !== -1) {
      setActivePhaseIndex(nextPending);
    } else {
      setActivePhaseIndex(ROADMAP_PHASES.length - 1);
    }
  }, [completedPhases]);

  const togglePhase = (id, idx) => {
    setCompletedPhases((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
    setActivePhaseIndex(idx);
  };

  const markAll = () => {
    setCompletedPhases(ROADMAP_PHASES.map((p) => p.id));
    setActivePhaseIndex(ROADMAP_PHASES.length - 1);
  };

  const resetAll = () => {
    setCompletedPhases([]);
    setActivePhaseIndex(0);
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

      {/* Main Roadmap Wall with Curved Road SVG and Floating Text */}
      <div className="roadmap-highway-wall">
        {/* SVG Curved Road Layer */}
        <div className="svg-road-layer">
          <svg
            viewBox="0 0 1000 1480"
            className="highway-canvas"
            preserveAspectRatio="xMidYMin meet"
          >
            {/* The Asphalt Road (Clean, no thick gray curbs) */}
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

            {/* Waypoint Dots and Pointer Lines */}
            {ROADMAP_PHASES.map((phase, idx) => {
              const isDone = completedPhases.includes(phase.id);
              const isActive = activePhaseIndex === idx;

              return (
                <g key={phase.id} className="road-point-group">
                  {/* Leader line pointing to text block */}
                  <line
                    x1={phase.roadX}
                    y1={phase.roadY}
                    x2={phase.lineEndX}
                    y2={phase.roadY}
                    className={`road-pointer-line ${isDone ? "line-done" : ""} ${isActive ? "line-active" : ""}`}
                  />

                  {/* Waypoint Dot on Road */}
                  <circle
                    cx={phase.roadX}
                    cy={phase.roadY}
                    r={isActive ? 9 : 7}
                    className={`road-pin-circle ${isDone ? "pin-done" : ""} ${isActive ? "pin-active" : ""}`}
                    onClick={() => togglePhase(phase.id, idx)}
                    cursor="pointer"
                  />

                  {/* Center Dot */}
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

          {/* Bear Marker moving accurately on the road */}
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

        {/* Floating Text Blocks ("Written on the Wall" - No Box Borders) */}
        <div className="wall-text-blocks-layer">
          {ROADMAP_PHASES.map((phase, idx) => {
            const isDone = completedPhases.includes(phase.id);
            const isActive = activePhaseIndex === idx;
            const isLeft = phase.side === "left";

            return (
              <div
                key={phase.id}
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
                    className={`wall-toggle-btn  ${isDone ? "is-done" : ""}`}
                    onClick={() => togglePhase(phase.id, idx)}
                  >
                    {isDone ? (
                      <>
                        <Check size={12} className="check-svg" />
                        <span>Done</span>
                      </>
                    ) : (
                      <span  >Mark Done</span>
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
  );
}
