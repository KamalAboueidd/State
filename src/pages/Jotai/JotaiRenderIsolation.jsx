import React, { useRef } from "react";
import { useAtom } from "jotai";
import { countAtom, textAtom } from "./jotai";

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

function AtomAComponent() {
  const [count, setCount] = useAtom(countAtom);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: "14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted, #737373)", fontWeight: 600 }}>
        <span>SUBSCRIBES TO: countAtom</span>
        <span style={{ color: "var(--text-primary, #ededed)" }}>Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "6px", marginBottom: "10px" }}>
        {count}
      </div>
      <button type="button" style={buttonStyle} onClick={() => setCount((c) => c + 1)}>
        + Increment countAtom
      </button>
    </div>
  );
}

function AtomBComponent() {
  const [text, setText] = useAtom(textAtom);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: "14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted, #737373)", fontWeight: 600 }}>
        <span>SUBSCRIBES TO: textAtom</span>
        <span style={{ color: "var(--text-primary, #ededed)" }}>Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary, #ededed)", marginTop: "12px", marginBottom: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {text}
      </div>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setText((t) => (t === "Jotai Atomic State" ? "Independent State Updated" : "Jotai Atomic State"))}
      >
        Toggle textAtom
      </button>
    </div>
  );
}

export default function JotaiRenderIsolation() {
  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
        Jotai Atomic Render Isolation
      </h3>
      <p style={{ color: "var(--text-secondary, #a1a1a1)", fontSize: "13px", margin: "0 0 18px 0", lineHeight: "1.5" }}>
        Compare the render counters of the two independent components below. Updating <code>countAtom</code> only triggers a re-render for Component A. Component B is unaffected because state is split into isolated atoms (bottom-up), eliminating top-down tree re-renders.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <AtomAComponent />
        <AtomBComponent />
      </div>
    </div>
  );
}

