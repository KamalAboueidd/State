import React from "react";
import { useSnapshot } from "valtio";
import { appState, state, appActions, AppActions } from "./vakitoWithActions";

export default function TodoList() {
  const snap = useSnapshot(appState || state);
  const actions = appActions || AppActions;

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addTodo();
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-primary, #ededed)", fontWeight: 600 }}>
          Valtio Todo List (Actions Pattern)
        </h3>
        <span style={{ fontSize: "12px", padding: "2px 8px", borderRadius: "4px", background: "var(--bg-subtle, #121212)", border: "1px solid var(--border-subtle, #1a1a1a)", color: "var(--text-muted, #737373)" }}>
          {snap.todos.filter((t) => t.completed).length} / {snap.todos.length} done
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          value={snap.newTodoText || ""}
          onChange={(e) => actions.setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border, #262626)",
            background: "var(--bg-subtle, #121212)",
            color: "var(--text-primary, #ededed)",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border-strong, #383838)",
            background: "var(--text-primary, #ededed)",
            color: "var(--bg-page, #000000)",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {snap.todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: "6px",
              background: "var(--bg-subtle, #121212)",
              border: "1px solid var(--border-subtle, #1a1a1a)",
              transition: "all 0.15s ease",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                flex: 1,
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => actions.toggleTodo(todo.id)}
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
            </label>

            <button
              type="button"
              onClick={() => actions.deleteTodo(todo.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted, #737373)",
                cursor: "pointer",
                padding: "2px 8px",
                fontSize: "13px",
              }}
              title="Delete Todo"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
