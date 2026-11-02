import { proxy } from "valtio";

export const state = proxy({
  todos: [
    { id: 1, text: "Learn Valtio Proxy Architecture", completed: true },
    { id: 2, text: "Implement Derived State with Native Getters", completed: true },
    { id: 3, text: "Build React Reactive UI with useSnapshot", completed: false },
    { id: 4, text: "Configure External Storage Persistence", completed: false },
  ],

  // =========================================================================
  // Derived State via native JavaScript Object Getters:
  // Using the 'get' keyword transforms this function into a reactive property.
  // Access it as `snap.completedCount` without calling `()`!
  // =========================================================================
  get completedCount() {
    return state.todos.filter((todo) => todo.completed).length;
  },

  get remainingCount() {
    return state.todos.length - state.completedCount;
  },

  get progressPercentage() {
    if (state.todos.length === 0) return 0;
    return Math.round((state.completedCount / state.todos.length) * 100);
  },
});
