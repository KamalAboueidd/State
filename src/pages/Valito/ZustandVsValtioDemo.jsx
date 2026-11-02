import React, { useRef } from "react";
import useStore from "../../store/zustand/useStore";
import { proxy, useSnapshot } from "valtio";

const valtioDemoState = proxy({
  count: 0,
});

const buttonStyle = {
  padding: "8px 14px",
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

function ZustandWidget() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decreament = useStore((state) => state.decreament);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: "14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary, #ededed)" }}>Zustand (Selector Hook)</span>
        <span style={{ fontSize: "11px", color: "var(--text-muted, #737373)" }}>Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", marginBottom: "10px", fontFamily: "monospace" }}>
        useStore(state =&gt; state.count)
      </div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary, #ededed)", marginBottom: "12px" }}>
        {count}
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        <button type="button" style={buttonStyle} onClick={increment}>
          + set(s =&gt; (&#123; count: s.count + 1 &#125;))
        </button>
        <button type="button" style={buttonStyle} onClick={decreament}>
          - Decrement
        </button>
      </div>
    </div>
  );
}

function ValtioWidget() {
  const snap = useSnapshot(valtioDemoState);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: "14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary, #ededed)" }}>Valtio (Proxy Auto-Tracking)</span>
        <span style={{ fontSize: "11px", color: "var(--text-muted, #737373)" }}>Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", marginBottom: "10px", fontFamily: "monospace" }}>
        const snap = useSnapshot(state);
      </div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary, #ededed)", marginBottom: "12px" }}>
        {snap.count}
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        <button type="button" style={buttonStyle} onClick={() => valtioDemoState.count++}>
          + state.count++
        </button>
        <button type="button" style={buttonStyle} onClick={() => valtioDemoState.count--}>
          - state.count--
        </button>
      </div>
    </div>
  );
}

export default function ZustandVsValtioDemo() {
  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
        Live Side-by-Side: Zustand vs. Valtio
      </h3>
      <p style={{ color: "var(--text-secondary, #a1a1a1)", fontSize: "13px", margin: "0 0 16px 0", lineHeight: "1.5" }}>
        Test both state models below: Zustand uses explicit functional selectors (<code>set</code> updater), while Valtio uses direct in-place mutation (<code>state.count++</code>) paired with automatic <code>useSnapshot</code> property tracking.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <ZustandWidget />
        <ValtioWidget />
      </div>
    </div>
  );
}

