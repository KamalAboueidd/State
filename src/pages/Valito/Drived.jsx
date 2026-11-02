import React from "react";
import { useSnapshot } from "valtio";
import { state } from "./DrivedState";

export default function TodoStats() {
  const snap = useSnapshot(state);

  const toggleTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
        Valtio Derived State (Native Getters)
      </h3>
      <p style={{ color: "var(--text-secondary, #a1a1a1)", fontSize: "13px", margin: "0 0 18px 0", lineHeight: "1.5" }}>
        Derived values are defined directly as native JavaScript getters (<code>get completedCount()</code>) on the proxy object without selectors or extra libraries.
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted, #737373)", marginBottom: "6px" }}>
          <span>Completion Progress</span>
          <span style={{ color: "var(--text-primary, #ededed)", fontWeight: "600" }}>{snap.progressPercentage}%</span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "var(--bg-subtle, #121212)", borderRadius: "3px", overflow: "hidden", border: "1px solid var(--border-subtle, #1a1a1a)" }}>
          <div
            style={{
              width: `${snap.progressPercentage}%`,
              height: "100%",
              background: "var(--text-primary, #ededed)",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

      {/* Stat Badges */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "18px" }}>
        <div style={{ padding: "12px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase" }}>Total Tasks</div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "4px" }}>{snap.todos.length}</div>
        </div>

        <div style={{ padding: "12px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase" }}>Completed</div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "4px" }}>{snap.completedCount}</div>
        </div>

        <div style={{ padding: "12px", background: "var(--bg-subtle, #121212)", borderRadius: "6px", border: "1px solid var(--border-subtle, #1a1a1a)", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", textTransform: "uppercase" }}>Remaining</div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary, #ededed)", marginTop: "4px" }}>{snap.remainingCount}</div>
        </div>
      </div>

      {/* Interactive checklist */}
      <div style={{ fontSize: "11px", color: "var(--text-muted, #737373)", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Click any task below to trigger reactive derived recalculation:
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {snap.todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "6px",
              background: "var(--bg-subtle, #121212)",
              border: "1px solid var(--border-subtle, #1a1a1a)",
              cursor: "pointer",
              userSelect: "none",
              transition: "border-color 0.15s ease",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
              style={{ cursor: "pointer" }}
            />
            <span
              style={{
                fontSize: "13px",
                color: todo.completed ? "var(--text-muted, #737373)" : "var(--text-primary, #ededed)",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
