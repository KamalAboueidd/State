import React from "react";
import { useSnapshot } from "valtio";
import { persistenceState } from "./valitoWithPresistance";

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

export default function ThemeToggle() {
  const snap = useSnapshot(persistenceState);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
          Valtio Persistence Engine (subscribe + snapshot)
        </h3>
        <span
          style={{
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "4px",
            background: "var(--bg-subtle, #121212)",
            border: "1px solid var(--border-subtle, #1a1a1a)",
            color: "var(--text-muted, #737373)",
            fontFamily: "monospace",
          }}
        >
          key: "valtio_persisted_state"
        </span>
      </div>

      <p style={{ fontSize: "13px", color: "var(--text-secondary, #a1a1a1)", margin: "0 0 18px 0", lineHeight: "1.5" }}>
        Every mutation on the proxy executes <code>subscribe(state, callback)</code> outside the React component lifecycle, serializing a frozen <code>snapshot(state)</code> into <code>localStorage</code>.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "18px" }}>
        <div style={{ padding: "12px 14px", borderRadius: "6px", background: "var(--bg-subtle, #121212)", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", fontWeight: 600 }}>Active Theme</div>
          <div style={{ fontSize: "18px", fontWeight: "700", marginTop: "4px", textTransform: "capitalize", color: "var(--text-primary, #ededed)" }}>
            {snap.theme}
          </div>
        </div>

        <div style={{ padding: "12px 14px", borderRadius: "6px", background: "var(--bg-subtle, #121212)", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", fontWeight: 600 }}>Persisted Counter</div>
          <div style={{ fontSize: "18px", fontWeight: "700", marginTop: "4px", color: "var(--text-primary, #ededed)" }}>
            {snap.counter}
          </div>
        </div>

        <div style={{ padding: "12px 14px", borderRadius: "6px", background: "var(--bg-subtle, #121212)", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", fontWeight: 600 }}>Last Synced</div>
          <div style={{ fontSize: "13px", fontFamily: "monospace", marginTop: "8px", color: "var(--text-primary, #ededed)" }}>
            {snap.lastSavedAt || "Ready to sync"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button
          type="button"
          onClick={() => {
            persistenceState.theme = persistenceState.theme === "dark" ? "light" : "dark";
          }}
          style={buttonStyle}
        >
          Toggle Theme ({snap.theme})
        </button>

        <button
          type="button"
          onClick={() => {
            persistenceState.counter++;
          }}
          style={buttonStyle}
        >
          + Increment Counter
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("valtio_persisted_state");
            persistenceState.theme = "dark";
            persistenceState.counter = 0;
            persistenceState.lastSavedAt = "Cleared";
          }}
          style={{ ...buttonStyle, color: "var(--text-muted, #888888)" }}
        >
          Clear Storage
        </button>
      </div>
    </div>
  );
}
