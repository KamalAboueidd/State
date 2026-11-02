import { proxy, subscribe, snapshot } from "valtio";

const STORAGE_KEY = "valtio_persisted_state";

// 1. Initial State Hydration from Browser LocalStorage
const loadInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read Valtio state from localStorage:", err);
  }
  return {
    theme: "dark",
    counter: 10,
    lastSavedAt: null,
  };
};

export const persistenceState = proxy(loadInitialState());

// Backwards compatibility alias
export const state = persistenceState;

// 2. subscribe() runs outside React whenever proxy mutations occur
subscribe(persistenceState, () => {
  // snapshot() creates a frozen immutable JavaScript snapshot safe for JSON serialization
  const snap = snapshot(persistenceState);
  try {
    const dataToSave = {
      ...snap,
      lastSavedAt: new Date().toLocaleTimeString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error("Could not persist Valtio state:", err);
  }
});
