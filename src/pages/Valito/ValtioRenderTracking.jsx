import React, { useRef } from "react";
import { proxy, useSnapshot } from "valtio";

const trackingState = proxy({
  count: 0,
  username: "kamal",
  nested: {
    role: "Frontend Lead",
  },
});

const buttonStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid var(--border-strong, #383838)",
  background: "var(--bg-subtle, #141414)",
  color: "var(--text-primary, #ededed)",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: "12px",
  fontFamily: "inherit",
  transition: "background 0.15s ease, border-color 0.15s ease",
};

function CountDisplay() {
  const snap = useSnapshot(trackingState);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: "14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted, #737373)", fontWeight: 600 }}>
        <span>CONSUMES: snap.count</span>
        <span style={{ color: "var(--text-primary, #ededed)" }}>Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "6px" }}>
        {snap.count}
      </div>
    </div>
  );
}

function UserDisplay() {
  const snap = useSnapshot(trackingState);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: "14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted, #737373)", fontWeight: 600 }}>
        <span>CONSUMES: snap.username</span>
        <span style={{ color: "var(--text-primary, #ededed)" }}>Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-primary, #ededed)", marginTop: "8px" }}>
        {snap.username}
      </div>
    </div>
  );
}

export default function ValtioRenderTracking() {
  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
        useSnapshot Fine-Grained Render Tracking
      </h3>
      <p style={{ color: "var(--text-secondary, #a1a1a1)", fontSize: "13px", margin: "0 0 18px 0", lineHeight: "1.5" }}>
        Observe the render counter for each component below: when mutating <code>count</code>, only the Count component re-renders. The Username component is completely skipped because <code>useSnapshot</code> tracks property access at the getter level.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
        <CountDisplay />
        <UserDisplay />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => trackingState.count++}
        >
          Mutate count++ (Left Only Re-renders)
        </button>

        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            trackingState.username = trackingState.username === "kamal" ? "ali_developer" : "kamal";
          }}
        >
          Mutate username (Right Only Re-renders)
        </button>
      </div>
    </div>
  );
}
