import { proxy } from "valtio";

export const appState = proxy({
  theme: "light",
  newTodoText: "",
  todos: [
    { id: 1, text: "Learning Valtio Fundamentals", completed: true },
    { id: 2, text: "Building Todo App with Client State", completed: false },
    { id: 3, text: "Proxy Mutations & useSnapshot Tracking", completed: false },
  ],
});

// Alias for backwards compatibility with existing imports
export const state = appState;

export const appActions = {
  toggleTheme: () => {
    appState.theme = appState.theme === "light" ? "dark" : "light";
  },
  setNewTodoText: (text) => {
    appState.newTodoText = text;
  },
  addTodo: (text) => {
    const value = (text !== undefined ? text : appState.newTodoText).trim();
    if (!value) return;
    appState.todos.push({
      id: Date.now(),
      text: value,
      completed: false,
    });
    appState.newTodoText = "";
  },
  toggleTodo: (id) => {
    const todo = appState.todos.find((item) => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  deleteTodo: (id) => {
    const index = appState.todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      appState.todos.splice(index, 1);
    }
  },
};

export const AppActions = appActions;
