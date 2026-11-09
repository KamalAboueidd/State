import React, { useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { countAtom, doubleCountAtom, textAtom } from "./jotai";

export default function CounterWithJotai() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const [text, setText] = useAtom(textAtom);
  const renderCount = useRef(0);
  renderCount.current += 1;

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
          Jotai Atomic State Counter
        </h3>
        <span style={{ fontSize: "11px", color: "var(--text-muted, #737373)" }}>
          Renders: {renderCount.current}
        </span>
      </div>

      <p style={{ color: "var(--text-secondary, #a1a1a1)", fontSize: "13px", margin: "0 0 18px 0", lineHeight: "1.5" }}>
        Bottom-up atomic state architecture. Primitive atoms hold independent state pieces, while derived atoms compute values automatically without top-down store ceremony.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "18px" }}>
        <div style={{ padding: "12px 14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
            Primitive Atom (countAtom)
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "4px" }}>
            {count}
          </div>
        </div>

        <div style={{ padding: "12px 14px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
            Derived Atom (doubleCountAtom)
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "4px" }}>
            {doubleCount}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase", marginBottom: "6px", fontWeight: 600 }}>
          Independent Text Atom (textAtom)
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border, #262626)",
            background: "var(--bg-subtle, #121212)",
            color: "var(--text-primary, #ededed)",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setCount((c) => c + 1)}
        >
          + Increment countAtom
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setCount((c) => c - 1)}
        >
          - Decrement countAtom
        </button>
        <button
          type="button"
          style={{ ...buttonStyle, color: "var(--text-muted, #888888)" }}
          onClick={() => {
            setCount(0);
            setText("Jotai Atomic State");
          }}
        >
          Reset Atoms
        </button>
      </div>
    </div>
  );
}
