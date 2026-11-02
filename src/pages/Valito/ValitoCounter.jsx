import React from "react";
import { useSnapshot } from "valtio";
import { state } from "./valito";

export default function ValitoCounter() {
  const snap = useSnapshot(state);

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

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
        Valtio Direct Mutation Counter
      </h3>
      <p style={{ color: "var(--text-secondary, #a1a1a1)", fontSize: "13px", margin: "0 0 18px 0", lineHeight: "1.5" }}>
        Directly mutates the mutable proxy state without reducers or dispatch. <code>useSnapshot</code> tracks accessed properties and re-renders only when those specific properties change.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "18px" }}>
        <div style={{ padding: "12px 14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
            Counter Value
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "4px" }}>
            {snap.count}
          </div>
        </div>

        <div style={{ padding: "12px 14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
            User Name
          </div>
          <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary, #ededed)", marginTop: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {snap.user.name}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => state.count++}
        >
          + state.count++
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => state.count--}
        >
          - state.count--
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            state.user.name = state.user.name === "Kamal Abou Eid" ? "Ali Hassan" : "Kamal Abou Eid";
          }}
        >
          Toggle User Name
        </button>
        <button
          type="button"
          style={{ ...buttonStyle, color: "var(--text-muted, #888888)" }}
          onClick={() => {
            state.count = 0;
            state.user.name = "Kamal Abou Eid";
          }}
        >
          Reset State
        </button>
      </div>
    </div>
  );
}
