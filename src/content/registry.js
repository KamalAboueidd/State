// Comprehensive Content Registry for Frontend Engineering Knowledge Dashboard
// 100% faithful representation of README.md with granular navigation, code, diagrams, and runnable playgrounds.

export const TOPIC_CATEGORIES = [
  {
    id: "foundations",
    name: "Foundations & State Theory",
    description: "Core classification and architectural boundaries between Local, Client, and Server state.",
  },
  {
    id: "zustand",
    name: "Zustand (Client State)",
    description: "Lightweight, unopinionated centralized store with direct subscriptions, zero boilerplate, and modular slices.",
  },
  {
    id: "redux",
    name: "Redux Toolkit (RTK)",
    description: "Predictable unidirectional data flow, configureStore, createSlice, memoized selectors, and async thunks.",
  },
  {
    id: "normalized-state",
    name: "Normalized State & Entity Adapter",
    description: "Eliminating O(N) search bottlenecks with O(1) normalized state, 12 CRUD methods, and 5 memoized selectors.",
  },
  {
    id: "rtk-query",
    name: "RTK Query (Data Fetching)",
    description: "Zero-boilerplate data fetching, caching, deduplication, and automatic tag-based cache invalidation.",
  },
  {
    id: "react-query",
    name: "TanStack React Query",
    description: "Advanced asynchronous server-state engine: caching, stale-while-revalidate, mutations, pagination, and infinite scroll.",
  },
  {
    id: "roadmap",
    name: "Roadmap & Next-Gen Architecture",
    description: "Upcoming topics: atomic state (Jotai), tree-shakeable validation (Valibot), and enterprise JWT flows.",
  },
];

export const TOPICS = [
  // =========================================================================
  // 1. FOUNDATIONS & STATE THEORY
  // =========================================================================
  {
    id: "state-foundations",
    slug: "foundations/state-theory",
    category: "foundations",
    group: "State Theory",
    title: "What is State in Frontend Engineering?",
    description: "A formal architectural breakdown: Local State (useState) vs. Client State (Zustand/Redux) vs. Server State (React Query).",
    badge: "Theory",
    readTime: "7 min read",
    summary: "State represents the temporal data driving the user interface at any given moment. In modern frontend architecture, treating all data as a single generic 'state' causes severe performance bottlenecks, race conditions, and synchronization nightmares. Modern engineering divides data into distinct realms: Local Component State, Shared Client State, and Remote Server State.",
    keyPoints: [
      "Local State (useState/useReducer): Private to one component subtree; destroyed upon unmounting.",
      "Shared Client State (Zustand / Redux Toolkit): Synchronous in-memory UI state shared across disjoint components (modals, auth sessions, dark mode, shopping cart).",
      "Server State (TanStack Query / RTK Query): Asynchronous remote data owned by the backend. It requires caching, background deduplication, optimistic mutation, and stale-time expiration.",
      "Direct State vs. Prop Drilling: Direct state allows leaf components to subscribe directly to stores without intermediary component re-renders.",
    ],
    codeSnippets: [
      {
        title: "Architectural Comparison: Choosing the Right Tool",
        language: "javascript",
        code: `// 1. Local State: Private to UI widget
const [isOpen, setIsOpen] = useState(false);

// 2. Client State (Zustand): Synchronous global store
const user = useAuthStore((state) => state.user);

// 3. Server State (TanStack Query): Remote data caching & sync
const { data: posts, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 1000 * 60 * 5,
});`
      }
    ],
    playgroundCode: `// Live State Classification Test
function classifyData(dataName, isAsync, isShared) {
  if (isAsync) return \`"\${dataName}" is SERVER STATE -> Use TanStack Query or RTK Query\`;
  if (isShared) return \`"\${dataName}" is SHARED CLIENT STATE -> Use Zustand or Redux Toolkit\`;
  return \`"\${dataName}" is LOCAL STATE -> Use React useState or useReducer\`;
}

console.log(classifyData("User Posts List", true, true));
console.log(classifyData("Dark Theme Toggle", false, true));
console.log(classifyData("Dropdown Open/Close", false, false));
return "All 3 state types classified accurately.";`
  },

  // =========================================================================
  // 2. ZUSTAND
  // =========================================================================
  {
    id: "zustand-overview",
    slug: "zustand",
    category: "zustand",
    group: "Zustand Core",
    title: "Zustand Overview & Architecture",
    description: "Fast, lightweight state management for React with zero boilerplate and no Context Providers.",
    badge: "Core",
    readTime: "5 min read",
    image: {
      src: "/Zustand1.png",
      alt: "Zustand Architecture Flow Diagram",
      caption: "Zustand Architecture: Components connect directly to hooks and subscribe to store updates."
    },
    secondaryImage: {
      src: "/zustand-vs-redux-toolkit-for-react-state-managemen-1770720374772.png",
      alt: "Zustand vs Redux Toolkit Flow Comparison",
      caption: "Direct Subscription (Zustand) vs. Unidirectional Reducer Flow (Redux Toolkit)."
    },
    demoComponent: "CounterZustand",
    demoTitle: "Interactive Zustand Counter",
    summary: "Zustand is a fast, lightweight state management library for React. It provides a centralized store with a minimal API, zero boilerplate, and no need to wrap your app in Context Providers. State updates merge shallowly by default.",
    keyPoints: [
      "No Provider wrapper required around the React root.",
      "Direct hooks-based state access with selective re-rendering.",
      "Shallow merge by default on state updates (no manual object spreading needed for unmodified top-level state).",
      "Seamless middleware composition: Immer, Persist, DevTools, and subscribeWithSelector."
    ],
    codeSnippets: [
      {
        title: "Creating a Store & Updating State",
        language: "javascript",
        code: `import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;`
      }
    ],
    playgroundCode: `// Simulating Zustand Store & Shallow Merge
let state = { count: 0, user: "Kamal", theme: "dark" };

function set(updater) {
  const updates = typeof updater === "function" ? updater(state) : updater;
  state = { ...state, ...updates }; // shallow merge preserves unmodified keys
  console.log("Store Updated:", state);
}

set((s) => ({ count: s.count + 1 }));
set({ theme: "light" });
return \`Current count: \${state.count}, User: \${state.user}, Theme: \${state.theme}\`;`
  },
  {
    id: "zustand-immer",
    slug: "zustand/immer",
    category: "zustand",
    group: "Zustand Core",
    title: "Immer Middleware (Direct Mutable Updates)",
    description: "Mutating state drafts directly with push and assignment while maintaining full immutability.",
    badge: "Middleware",
    readTime: "5 min read",
    image: {
      src: "/Zustand2.png",
      alt: "Zustand Store Lifecycle & Tracking",
      caption: "Zustand tracking accessed state slices and re-rendering only affected components."
    },
    summary: "Immer allows direct mutable updates (mutating drafts) while maintaining full immutability under the hood. You can write mutating syntax like `state.todos.push(newTodo)` safely.",
    keyPoints: [
      "Eliminates nested spreading boilerplate (`...state.user.preferences`).",
      "Drafts are captured and frozen into new immutable state references.",
      "Direct array mutations (`push`, `splice`) and object assignments are fully supported.",
    ],
    codeSnippets: [
      {
        title: "Immer Middleware Implementation",
        language: "javascript",
        code: `import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useArray = create(
  immer((set) => ({
    todos: [],
    addTodo: (newTodo) =>
      set((state) => {
        state.todos.push(newTodo);
      }),
  }))
);`
      }
    ],
    playgroundCode: `// Simulating Immer Draft Updates
const store = { todos: [{ id: 1, text: "Learn Zustand", done: false }] };

// Safe draft mutation simulation
const draft = JSON.parse(JSON.stringify(store));
draft.todos.push({ id: 2, text: "Master React Query", done: true });

console.log("Original untouched:", store.todos.length);
console.log("New immutable state:", draft.todos);
return \`Total todos in new state: \${draft.todos.length}\`;`
  },
  {
    id: "zustand-slices",
    slug: "zustand/slices",
    category: "zustand",
    group: "Zustand Core",
    title: "Store Slice Pattern & Combining Slices",
    description: "Splitting enterprise stores into smaller feature slices and combining them into one bound store.",
    badge: "Architecture",
    readTime: "6 min read",
    summary: "For larger applications, split stores into smaller feature slices and combine them into one bound store. Each slice defines its own state properties and actions.",
    keyPoints: [
      "Divide stores into domain feature slices: `authSlice.js`, `cartSlice.js`.",
      "Each slice is a creator function: `(set, get, api) => ({ ... })`.",
      "Combine all slices into a single unified `useBoundStore` with `...createSlice(...a)`.",
    ],
    codeSnippets: [
      {
        title: "Store Slice Pattern Implementation",
        language: "javascript",
        code: `// authSlice.js
export const createAuthSlice = (set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});

// cartSlice.js
export const createCartSlice = (set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (item) => set((state) => ({ cart: state.cart.filter((i) => i !== item) })),
});

// store.js
import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createCartSlice } from "./cartSlice";

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));`
      }
    ],
    playgroundCode: `// Simulating Slice Combination
const authSlice = (set) => ({ user: "Kamal", login: (u) => set({ user: u }) });
const cartSlice = (set) => ({ cart: ["Book"], add: (i) => set((s) => ({ cart: [...s.cart, i] })) });

let boundStore = {};
const set = (updater) => {
  const up = typeof updater === "function" ? updater(boundStore) : updater;
  boundStore = { ...boundStore, ...up };
  console.log("Bound Store Updated:", boundStore);
};

boundStore = { ...authSlice(set), ...cartSlice(set) };
console.log("Initial Bound Store:", boundStore);
boundStore.add("Laptop");
return \`Cart now has: \${boundStore.cart.join(", ")}\`;`
  },
  {
    id: "zustand-selectors-shallow",
    slug: "zustand/selectors",
    category: "zustand",
    group: "Zustand Core",
    title: "Accessing Store Values & useShallow",
    description: "Selective re-rendering and shallow reference comparison for arrays and objects.",
    badge: "Performance",
    readTime: "5 min read",
    summary: "Select only the values needed to avoid unnecessary re-renders. Use `useShallow` when selecting an object or array of multiple values to prevent infinite render loops.",
    keyPoints: [
      "Selecting the entire store triggers re-renders on ANY change.",
      "Atomic selectors (`state => state.user`) re-render only when the selected property changes.",
      "`useShallow` compares object keys and array elements shallowly to maintain referential equality.",
    ],
    codeSnippets: [
      {
        title: "Using useShallow in Components",
        language: "jsx",
        code: `import { useBoundStore } from "./store";
import { useShallow } from "zustand/react/shallow";

function Header() {
  const { user, logout } = useBoundStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );

  return (
    <header>
      {user ? <button onClick={logout}>Logout</button> : <span>Not logged in</span>}
    </header>
  );
}`
      }
    ],
    playgroundCode: `// Reference Equality vs Shallow Equality Test
const obj1 = { user: "Kamal", role: "Engineer" };
const obj2 = { user: "Kamal", role: "Engineer" };

console.log("Strict === Check:", obj1 === obj2); // false!

function shallowEqual(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => a[k] === b[k]);
}

console.log("useShallow Comparison:", shallowEqual(obj1, obj2)); // true!
return "useShallow prevents re-render because object properties are identical!";`
  },
  {
    id: "zustand-persist",
    slug: "zustand/persist",
    category: "zustand",
    group: "Zustand Core",
    title: "Persist Middleware (localStorage & Versioning)",
    description: "Auto-saving store data in browser storage with partialize, migration, and versioning.",
    badge: "Middleware",
    readTime: "5 min read",
    summary: "Saves store data in browser storage (`localStorage` by default) with support for partialize and versioning so sensitive or temporary fields are excluded.",
    keyPoints: [
      "`name`: Key used in localStorage.",
      "`partialize`: Explicitly choose which properties to save (`user` yes, `token` no).",
      "`version` & `migrate`: Allows safely evolving schemas across releases without corrupting client data.",
    ],
    codeSnippets: [
      {
        title: "Persist Middleware Configuration",
        language: "javascript",
        code: `import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // only persist user
      version: 1,
    }
  )
);`
      }
    ],
    playgroundCode: `// Simulating partialize filter
const rawStore = { user: "Kamal", token: "secret_123", tempCounter: 42 };

function partialize(state) {
  return { user: state.user }; // filter out token & tempCounter
}

const savedData = JSON.stringify(partialize(rawStore));
console.log("Saved to LocalStorage:", savedData);
return "Persisted data: " + savedData;`
  },
  {
    id: "zustand-subscribe-devtools",
    slug: "zustand/subscribe-devtools",
    category: "zustand",
    group: "Zustand Core",
    title: "subscribeWithSelector & Redux DevTools",
    description: "Listening to specific state changes outside React components and time-travel debugging.",
    badge: "Advanced",
    readTime: "5 min read",
    summary: "`subscribeWithSelector` lets you listen to specific state changes outside React components (ideal for logging, analytics, sync). `devtools` enables inspection and time-travel debugging inside Redux DevTools.",
    keyPoints: [
      "`subscribeWithSelector`: Filter subscriptions by selector with previous and current values.",
      "`devtools`: Integrates store actions directly into Redux DevTools extension.",
      "Action naming: Pass action name strings e.g. `set(..., false, 'counter/increment')` for clear DevTools logs.",
    ],
    codeSnippets: [
      {
        title: "DevTools and Subscriptions Setup",
        language: "javascript",
        code: `import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        count: 0,
        increment: () =>
          set((state) => ({ count: state.count + 1 }), false, "counter/increment"),
      })),
      { name: "counter-storage" }
    ),
    { name: "Counter Store" }
  )
);

// Subscribe to a specific field outside React:
useStore.subscribe(
  (state) => state.count,
  (current, prev) => console.log(\`Count changed from \${prev} to \${current}\`)
);`
      }
    ],
    playgroundCode: `// Simulating subscribeWithSelector outside React
let count = 0;
const subscribers = [];

function subscribe(selector, cb) {
  subscribers.push({ selector, cb, prev: selector({ count }) });
}

function update(newCount) {
  count = newCount;
  subscribers.forEach(sub => {
    const curr = sub.selector({ count });
    if (curr !== sub.prev) {
      sub.cb(curr, sub.prev);
      sub.prev = curr;
    }
  });
}

subscribe(s => s.count, (curr, prev) => console.log(\`Listener: \${prev} -> \${curr}\`));
update(1);
update(5);
return "Subscription fired accurately without React rendering!";`
  },

  // =========================================================================
  // 3. REDUX TOOLKIT (RTK)
  // =========================================================================
  {
    id: "redux-fundamentals",
    slug: "redux",
    category: "redux",
    group: "RTK Fundamentals",
    title: "1. Redux Fundamentals & Unidirectional Flow",
    description: "Core concepts: UI -> dispatch(action) -> Reducer -> State Update -> UI Re-render.",
    badge: "Core",
    readTime: "6 min read",
    image: {
      src: "/redux-toolkit-data-flow.jpg",
      alt: "Redux Toolkit Data Flow Diagram",
      caption: "Redux Data Flow: UI -> dispatch(action) -> Reducer -> State Update -> UI Re-render."
    },
    demoComponent: "CounterRTK",
    demoTitle: "Interactive RTK Counter",
    summary: "Redux manages shared global state through a predictable unidirectional flow: UI -> dispatch(action) -> Reducer -> State Update -> UI Re-render. Every update is explicit, traceable, and synchronous.",
    keyPoints: [
      "State: The data stored in Redux (e.g., `{ count: 0, user: null }`).",
      "Action: An object describing what happened (`{ type: 'counter/add', payload: 5 }`).",
      "Reducer: Pure function determining how state updates in response to actions.",
      "Dispatch: Triggers actions into the Redux store (`dispatch(increment())`).",
    ],
    codeSnippets: [
      {
        title: "Redux Flow Anatomy",
        language: "javascript",
        code: `// 1. Action
const increment = (amount) => ({
  type: "counter/increment",
  payload: amount,
});

// 2. Pure Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}`
      }
    ],
    playgroundCode: `// Simulating Redux Unidirectional Pipeline
let state = { count: 0 };

function reducer(s, action) {
  if (action.type === "counter/add") return { ...s, count: s.count + action.payload };
  return s;
}

function dispatch(action) {
  console.log("Action Dispatched:", action);
  state = reducer(state, action);
  console.log("New State:", state);
}

dispatch({ type: "counter/add", payload: 10 });
dispatch({ type: "counter/add", payload: 5 });
return \`Final Redux Count: \${state.count}\`;`
  },
  {
    id: "redux-store-setup",
    slug: "redux/store-setup",
    category: "redux",
    group: "RTK Fundamentals",
    title: "2. Installation & Store Setup (configureStore)",
    description: "Configuring the store and wrapping the React tree with Provider.",
    badge: "Setup",
    readTime: "4 min read",
    summary: "Redux Toolkit provides `configureStore` to replace the deprecated `createStore`. It sets up DevTools and Thunk middleware out of the box with zero manual configuration.",
    keyPoints: [
      "configureStore automatically adds Redux Thunk and sets up Redux DevTools.",
      "Provider wraps the application root in main.jsx to pass store access via React Context.",
    ],
    codeSnippets: [
      {
        title: "Store Setup & Provider Wrap",
        language: "jsx",
        code: `// store.js
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({ reducer: {} });

// main.jsx
import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}>
  <App />
</Provider>`
      }
    ],
    playgroundCode: `// Testing configureStore Mock
function mockConfigureStore({ reducer }) {
  let state = {};
  return {
    getState: () => state,
    dispatch: (action) => {
      console.log("Action processed by configureStore:", action.type);
    }
  };
}

const store = mockConfigureStore({ reducer: {} });
store.dispatch({ type: "app/init" });
return "configureStore initialized cleanly!";`
  },
  {
    id: "redux-create-slice",
    slug: "redux/create-slice",
    category: "redux",
    group: "RTK Fundamentals",
    title: "3. createSlice & Immer Integration",
    description: "Combining initialState, reducers, and auto-generated action creators with Immer.",
    badge: "Core API",
    readTime: "6 min read",
    demoComponent: "CounterRTK",
    demoTitle: "Live RTK Counter Demo",
    summary: "Combines initial state, reducers, and auto-generated action creators in one place. RTK uses Immer internally, allowing you to write mutating syntax (`state.count += 1`) safely.",
    keyPoints: [
      "`name`: Action namespace prefix (e.g. `'counter/increment'`).",
      "`reducers`: Functions defining state transitions; action creators are auto-generated.",
      "Immer proxies track mutations and generate a new immutable state copy automatically.",
    ],
    codeSnippets: [
      {
        title: "createSlice Implementation (counterSlice.js)",
        language: "javascript",
        code: `// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;`
      }
    ],
    playgroundCode: `// Action Creator auto-generation
function createAction(type) {
  const fn = (payload) => ({ type, payload });
  fn.type = type;
  return fn;
}

const increment = createAction("counter/increment");
console.log("Action Output:", increment());
return \`Action Type is "\${increment.type}"\`;`
  },
  {
    id: "redux-hooks",
    slug: "redux/hooks",
    category: "redux",
    group: "RTK Fundamentals",
    title: "4. React Hooks (useSelector & useDispatch)",
    description: "Connecting components to Redux state and triggering action dispatches.",
    badge: "Hooks",
    readTime: "5 min read",
    summary: "`useSelector` reads data from the store state with strict equality checks. `useDispatch` dispatches action creators into the Redux store.",
    keyPoints: [
      "Data Flow: Click Button -> dispatch(increment()) -> Reducer runs -> State updates -> useSelector detects change -> Component re-renders.",
      "Always select only the specific fields needed to minimize component re-renders.",
    ],
    codeSnippets: [
      {
        title: "Component Consumption Example",
        language: "jsx",
        code: `import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}`
      }
    ],
    playgroundCode: `// Simulating useSelector & useDispatch Lifecycle
let count = 42;
const dispatch = (action) => console.log("Dispatching:", action.type);

console.log("useSelector reads count:", count);
dispatch({ type: "counter/increment" });
return "Component hooks pattern simulated successfully!";`
  },
  {
    id: "redux-selectors-memoization",
    slug: "redux/selectors-and-memoization",
    category: "redux",
    group: "RTK Fundamentals",
    title: "5. Selectors & createSelector (Memoization)",
    description: "Extracting derived data and preventing unnecessary re-renders from new array references.",
    badge: "Performance",
    readTime: "6 min read",
    summary: "Selectors extract or compute derived data from state. Without memoization, functions like `.filter()` return a new reference on every run, triggering avoidable re-renders. `createSelector` memoizes results so calculations only re-run when inputs change.",
    keyPoints: [
      "Without Memoization: State change anywhere -> Selector recomputes -> New Array Reference -> Unnecessary re-renders.",
      "With createSelector: Same input state -> Returns cached result -> Prevents redundant re-renders.",
      "Chain multiple input selectors: `createSelector([selectTodos, selectFilter], (todos, filter) => ...)`.",
    ],
    codeSnippets: [
      {
        title: "createSelector Implementation",
        language: "javascript",
        code: `import { createSelector } from "@reduxjs/toolkit";

const selectTodos = (state) => state.todos.items;

export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => todo.completed)
);`
      }
    ],
    playgroundCode: `// Testing createSelector Memoization Cache
let lastInput = null;
let lastResult = null;

function memoizedFilter(items) {
  if (lastInput === items) {
    console.log("Returning CACHED reference (0ms computation)!");
    return lastResult;
  }
  console.log("Running EXPENSIVE filter calculation...");
  lastInput = items;
  lastResult = items.filter(x => x.done);
  return lastResult;
}

const list = [{ id: 1, done: true }, { id: 2, done: false }];
memoizedFilter(list); // calculates
memoizedFilter(list); // hits cache!
return "createSelector memoization verified!";`
  },
  {
    id: "redux-async-thunk",
    slug: "redux/create-async-thunk",
    category: "redux",
    group: "RTK Fundamentals",
    title: "6. createAsyncThunk & Lifecycle Actions",
    description: "Handling asynchronous requests and pending, fulfilled, and rejected lifecycles.",
    badge: "Async",
    readTime: "6 min read",
    demoComponent: "PostsList",
    demoTitle: "Live Posts Thunk Demo",
    summary: "Handles asynchronous logic (like HTTP requests). It automatically generates lifecycle actions: `pending`, `fulfilled`, and `rejected`. Components dispatch the thunk, and reducers listen via `extraReducers`.",
    keyPoints: [
      "Auto-generates 3 actions: `prefix/pending`, `prefix/fulfilled`, `prefix/rejected`.",
      "The builder callback in `extraReducers` provides safe, typed handling of each action type.",
      "Rejection errors automatically populate `action.error.message`.",
    ],
    codeSnippets: [
      {
        title: "createAsyncThunk & extraReducers Builder",
        language: "javascript",
        code: `import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://api.example.com/posts");
  return await response.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});`
      }
    ],
    playgroundCode: `// Async Thunk Lifecycle Simulation
async function simulateThunk(success = true) {
  console.log("1. Dispatched: posts/fetchPosts/pending");
  await new Promise(r => setTimeout(r, 80));
  if (success) {
    console.log("2. Dispatched: posts/fetchPosts/fulfilled (Items loaded!)");
    return "SUCCESS";
  } else {
    console.log("2. Dispatched: posts/fetchPosts/rejected (Error captured!)");
    return "ERROR";
  }
}

simulateThunk(true);
return "Async thunk lifecycle actions dispatched sequentially.";`
  },
  {
    id: "redux-project-architecture",
    slug: "redux/project-architecture",
    category: "redux",
    group: "RTK Fundamentals",
    title: "Project Architecture & Code-Splitting",
    description: "Organizing by features, base API injection (injectEndpoints), and modular store combination.",
    badge: "Architecture",
    readTime: "6 min read",
    summary: "Organize your project by features rather than technical layers. Each feature owns its slice, selectors, and API endpoints. Slices and injected endpoints are combined in central store.js and api.js files.",
    keyPoints: [
      "Features own their domain logic (`Slice` + `Selectors` + `Endpoints`).",
      "`injectEndpoints` allows feature APIs to split code without creating multiple base clients.",
      "`store.js` acts as the glue combining feature slices and api middleware.",
    ],
    codeSnippets: [
      {
        title: "injectEndpoints Pattern",
        language: "javascript",
        code: `// features/courses/coursesApi.js
import { api } from "../../services/api";

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
    addCourse: builder.mutation({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const { useGetCoursesQuery, useAddCourseMutation } = coursesApi;`
      }
    ],
    playgroundCode: `// Feature Architecture Simulation
const baseApi = { endpoints: {} };
function inject(name, endpointFn) {
  baseApi.endpoints[name] = endpointFn;
  console.log(\`Endpoint "\${name}" injected into base API!\`);
}

inject("getCourses", () => "/courses");
inject("getUsers", () => "/users");
return \`Total registered endpoints: \${Object.keys(baseApi.endpoints).length}\`;`
  },

  // =========================================================================
  // 4. NORMALIZED STATE & ENTITY ADAPTER
  // =========================================================================
  {
    id: "redux-entity-adapter-concept",
    slug: "redux/entity-adapter-concept",
    category: "normalized-state",
    group: "Normalized State",
    title: "1 & 2. The O(N) Problem & Normalized Concept",
    description: "Linear search bottlenecks vs. database-like O(1) order arrays (ids) and lookup dictionaries (entities).",
    badge: "Theory",
    readTime: "7 min read",
    image: {
      src: "/normalized-state-entity-adapter.jpg",
      alt: "Normalized State and Entity Adapter Architecture",
      caption: "Normalized State: Order Array (ids) + O(1) Lookup Dictionary (entities)."
    },
    demoComponent: "Courses",
    demoTitle: "Interactive Normalized Courses CRUD",
    summary: "When managing large collections as flat arrays (`[{ id: 1 }, { id: 2 }]`), linear O(N) search bottlenecks slow down the app, and modifying single items requires cloning entire arrays. Normalized state solves this by splitting data into `ids` (order array) and `entities` (O(1) dictionary).",
    keyPoints: [
      "O(N) Search Bottleneck: array.find() or array.filter() must scan the entire array.",
      "Cascading Re-renders: Modifying one item creates a new array reference, triggering re-renders across all items.",
      "Normalized Shape: `{ ids: [1, 2, 3], entities: { '1': {...}, '2': {...} } }`.",
      "Instant O(1) direct lookup: `state.entities[id]` without scanning through the array!",
    ],
    codeSnippets: [
      {
        title: "Un-normalized vs Normalized State Shape",
        language: "javascript",
        code: `// Un-normalized (O(N) search time)
const unnormalized = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" }
];

// Normalized State Concept (O(1) instant key lookup)
const normalized = {
  ids: [1, 2],
  entities: {
    1: { id: 1, name: "Leanne Graham" },
    2: { id: 2, name: "Ervin Howell" }
  }
};`
      }
    ],
    playgroundCode: `// Benchmarking O(N) Search vs O(1) Lookup
const array = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: "User " + i }));
const dict = Object.fromEntries(array.map(u => [u.id, u]));

console.time("Array O(N) Search");
const a = array.find(u => u.id === 888);
console.timeEnd("Array O(N) Search");

console.time("Normalized O(1) Lookup");
const b = dict[888];
console.timeEnd("Normalized O(1) Lookup");

return \`O(1) retrieved "\${b.name}" instantly without scanning!\`;`
  },
  {
    id: "redux-entity-adapter-methods",
    slug: "redux/entity-adapter-methods",
    category: "normalized-state",
    group: "Normalized State",
    title: "3 & 4. All 12 Built-in CRUD Methods Reference",
    description: "Complete reference with time complexity: setAll, addOne, updateOne, upsertOne, removeOne, etc.",
    badge: "API Reference",
    readTime: "7 min read",
    summary: "`createEntityAdapter` provides 12 pre-built reducer methods ready for use in slice reducers or extraReducers. Each method operates with optimal time complexity while maintaining sorted order automatically.",
    keyPoints: [
      "setAll(state, items) O(N log N): Clears all existing items and loads new sorted normalized list.",
      "setOne(state, item) O(1) & setMany(state, items) O(K): Adds or replaces items completely.",
      "addOne(state, item) O(1) & addMany(state, items) O(K): Inserts new items. Ignores duplicates.",
      "updateOne(state, { id, changes }) O(1) & updateMany: Updates specific fields of existing items.",
      "upsertOne(state, item) O(1) & upsertMany: Smart insert or update.",
      "removeOne(state, id) O(1), removeMany(state, [ids]) O(K), removeAll(state) O(1): Deletes entities and cleans IDs.",
    ],
    codeSnippets: [
      {
        title: "All 12 CRUD Methods in createSlice",
        language: "javascript",
        code: `import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const coursesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const coursesSlice = createSlice({
  name: "courses",
  initialState: coursesAdapter.getInitialState(),
  reducers: {
    setAllCourses: coursesAdapter.setAll,
    setOneCourse: coursesAdapter.setOne,
    setManyCourses: coursesAdapter.setMany,
    addCourse: coursesAdapter.addOne,
    addManyCourses: coursesAdapter.addMany,
    updateCourse: coursesAdapter.updateOne,       // { id, changes }
    updateManyCourses: coursesAdapter.updateMany,
    upsertCourse: coursesAdapter.upsertOne,
    upsertManyCourses: coursesAdapter.upsertMany,
    removeCourse: coursesAdapter.removeOne,       // id
    removeManyCourses: coursesAdapter.removeMany, // [ids]
    removeAllCourses: coursesAdapter.removeAll,
  },
});`
      }
    ],
    playgroundCode: `// Simulating CRUD Methods
let state = { ids: [1, 2], entities: { 1: { id: 1, name: "React" }, 2: { id: 2, name: "Zustand" } } };

// updateOne({ id: 1, changes: { name: "React 19" } })
state.entities[1] = { ...state.entities[1], name: "React 19" };
console.log("Updated Course 1:", state.entities[1]);

// removeOne(2)
state.ids = state.ids.filter(id => id !== 2);
delete state.entities[2];
console.log("After removeOne:", state);
return "CRUD operations completed cleanly!";`
  },
  {
    id: "redux-entity-adapter-selectors",
    slug: "redux/entity-adapter-selectors",
    category: "normalized-state",
    group: "Normalized State",
    title: "5. All 5 Built-in Memoized Selectors Reference",
    description: "selectAll, selectById, selectIds, selectEntities, and selectTotal return types and use cases.",
    badge: "Selectors",
    readTime: "5 min read",
    summary: "Calling `adapter.getSelectors((state) => state.feature)` generates 5 optimized memoized selectors ready for use with `useSelector`.",
    keyPoints: [
      "selectAll (Returns Array): Array of all entity objects in sorted order. Perfect for rendering lists with `.map()`.",
      "selectById (Returns Object | undefined): Single item object matching ID in O(1) time.",
      "selectIds (Returns Array): Array of all IDs (`[1, 2, 3]`).",
      "selectEntities (Returns Dictionary Object): Lookup dictionary (`{ [id]: entity }`).",
      "selectTotal (Returns Number): Total number of stored entities. Great for badge counts.",
    ],
    codeSnippets: [
      {
        title: "Consuming Pre-built Memoized Selectors",
        language: "javascript",
        code: `export const {
  selectAll: selectAllPosts,   // returns all posts in sorted array
  selectById: selectPostById,  // returns post by id in O(1)
  selectIds: selectPostIds,    // returns all ids
  selectEntities: selectPostEntities, // dictionary map
  selectTotal: selectTotalPosts,      // total count number
} = postsAdapter.getSelectors((state) => state.posts);`
      }
    ],
    playgroundCode: `// Testing Built-in Selectors
const state = {
  ids: [101, 202],
  entities: {
    101: { id: 101, title: "Course 1" },
    202: { id: 202, title: "Course 2" }
  }
};

const selectAll = (s) => s.ids.map(id => s.entities[id]);
const selectById = (s, id) => s.entities[id];
const selectTotal = (s) => s.ids.length;

console.log("selectAll():", selectAll(state));
console.log("selectById(202):", selectById(state, 202));
console.log("selectTotal():", selectTotal(state));
return \`Total count is \${selectTotal(state)}\`;`
  },
  {
    id: "redux-entity-adapter-example",
    slug: "redux/entity-adapter-example",
    category: "normalized-state",
    group: "Normalized State",
    title: "6. Complete Practical Example (Entity.js)",
    description: "Full working implementation matching src/store/Entity.js and UsersComponent.",
    badge: "Practical",
    readTime: "6 min read",
    demoComponent: "Courses",
    demoTitle: "Courses Entity CRUD Demo",
    summary: "A complete end-to-end implementation demonstrating `createEntityAdapter` with automatic alphabetical sorting, async thunk integration, slice reducers, and component consumption.",
    keyPoints: [
      "Auto-sorting with `sortComparer: (a, b) => a.name.localeCompare(b.name)`.",
      "setAll normalizes and sorts all items automatically on thunk fulfilled.",
      "Component dispatches `removeOne(id)` and `updateOne({ id, changes })` seamlessly.",
    ],
    codeSnippets: [
      {
        title: "Full Entity.js Implementation",
        language: "javascript",
        code: `import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Adapter with auto-sorting
const AllPosts = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// 2. Initial state with loading/error flags
const initialState = AllPosts.getInitialState({
  loading: false,
  error: null,
});

// 3. Async Thunk
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

// 4. Slice using adapter methods
export const AllPostsSlice = createSlice({
  name: 'AllPosts',
  initialState,
  reducers: {
    addOne: AllPosts.addOne,
    updateOne: AllPosts.updateOne,
    removeOne: AllPosts.removeOne,
    removeAll: AllPosts.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        AllPosts.setAll(state, action.payload); // normalizes & sorts
      });
  },
});`
      }
    ],
    playgroundCode: `// Sorting Demonstration with sortComparer
const items = [{ name: "Zustand" }, { name: "Angular" }, { name: "React" }];
items.sort((a, b) => a.name.localeCompare(b.name));
console.log("Automatically Sorted Entities:", items.map(i => i.name));
return "Sorted order: " + items.map(i => i.name).join(" -> ");`
  },

  // =========================================================================
  // 5. RTK QUERY
  // =========================================================================
  {
    id: "rtk-query-fundamentals",
    slug: "rtk-query",
    category: "rtk-query",
    group: "RTK Query",
    title: "RTK Query Architecture & API Slice",
    description: "Eliminating useEffect/useState boilerplate, createApi, fetchBaseQuery, and automatic hooks.",
    badge: "Core",
    readTime: "6 min read",
    image: {
      src: "/rtk-query-architecture-cache.jpg",
      alt: "RTK Query Architecture & Caching Diagram",
      caption: "RTK Query Architecture: Base query, cache tags, and auto-generated hooks."
    },
    demoComponent: "RtkQueryPosts",
    demoTitle: "Live RTK Query Posts & Mutations",
    summary: "RTK Query eliminates the need for manual `useEffect`, `useState`, and `createAsyncThunk` boilerplate for data fetching. It manages loading states, caching, deduplication, and automatic refetching out of the box.",
    keyPoints: [
      "`createApi`: Declares base query, tagTypes, and endpoints in one place.",
      "`fetchBaseQuery`: Lightweight fetch wrapper handling JSON parsing and headers.",
      "Endpoints automatically generate custom hooks e.g. `useGetPostsQuery`, `useAddPostMutation`.",
      "Middleware: Concatenates `apiSlice.middleware` to manage cache lifetimes and requests.",
    ],
    codeSnippets: [
      {
        title: "API Slice Setup (apiSlice.js)",
        language: "javascript",
        code: `import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = apiSlice;`
      }
    ],
    playgroundCode: `// Simulating Tag Invalidation in RTK Query
const queryCache = { posts: ["Post 1", "Post 2"] };

function triggerMutation(newPost) {
  console.log("Mutation: Adding", newPost.title);
  console.log("Invalidating Tag: ['Posts'] -> Triggers automatic getPosts re-fetch!");
  queryCache.posts.push(newPost.title);
}

triggerMutation({ title: "Post 3 (Fresh)" });
return \`Updated cached posts: \${queryCache.posts.join(", ")}\`;`
  },

  // =========================================================================
  // 6. TANSTACK REACT QUERY
  // =========================================================================
  {
    id: "react-query-overview",
    slug: "react-query",
    category: "react-query",
    group: "React Query Core",
    title: "1. Setup & Configuration (QueryClient)",
    description: "Client State vs Server State, QueryClient defaultOptions, staleTime, gcTime, and DevTools.",
    badge: "Core",
    readTime: "6 min read",
    demoComponent: "ProductsComponent",
    demoTitle: "Basic QueryClient Products Demo",
    summary: "TanStack Query manages asynchronous server data, caching, background synchronization, deduplication, and loading/error states. Setting up a central QueryClient configures global policies for staleTime and garbage collection.",
    keyPoints: [
      "Client State (UI toggles, themes) vs Server State (Remote database records, async caching).",
      "staleTime: How long data remains fresh (no background refetch during this time).",
      "gcTime (formerly cacheTime): How long inactive cache stays in memory before garbage collection.",
      "QueryClientProvider & ReactQueryDevtools wrap the root application in main.jsx.",
    ],
    codeSnippets: [
      {
        title: "QueryClient Configuration (queryClient.js)",
        language: "javascript",
        code: `import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,    // 5 minutes fresh
      gcTime: 1000 * 60 * 10,      // 10 minutes cache retention
      refetchOnWindowFocus: false, // Prevents refetch on window focus
      retry: 3,                    // Retries failed queries 3 times
    },
  },
});`
      }
    ],
    playgroundCode: `// Simulating QueryClient In-Memory Cache
const memoryCache = new Map();

function getQuery(key, fetcher) {
  if (memoryCache.has(key)) {
    console.log(\`[Cache Hit] Serving "\${key}" instantly from memory (0ms network request)!\`);
    return memoryCache.get(key);
  }
  console.log(\`[Cache Miss] Fetching "\${key}" from server...\`);
  const data = fetcher();
  memoryCache.set(key, data);
  return data;
}

getQuery("users", () => ["Kamal", "Sarah"]);
getQuery("users", () => ["Kamal", "Sarah"]); // 2nd call hits cache!
return "QueryClient cache prevents duplicate network requests.";`
  },
  {
    id: "react-query-use-query",
    slug: "react-query/use-query",
    category: "react-query",
    group: "React Query Core",
    title: "2. Advanced useQuery Anatomy & Options",
    description: "Anatomy of useQuery: queryKey, queryFn, staleTime, gcTime, refetchOnWindowFocus, retry, and select.",
    badge: "API",
    readTime: "7 min read",
    demoComponent: "PostsQuery",
    demoTitle: "useQuery Lifecycle Demo",
    summary: "The `useQuery` hook manages reading, caching, and auto-syncing remote data. Options like `select` transform data on the fly, while `retryDelay` provides exponential backoff.",
    keyPoints: [
      "`queryKey`: Unique identifier array; dynamic variables trigger automatic cache segmentation.",
      "`queryFn`: Async function receiving `{ queryKey, signal }`.",
      "`select`: Transforms or memoizes data before handing it to the component.",
      "`retryDelay`: Exponential backoff: `(attempt) => Math.min(1000 * 2 ** attempt, 30000)`.",
    ],
    codeSnippets: [
      {
        title: "Advanced useQuery Configuration",
        language: "javascript",
        code: `const {
  data: todos,
  isLoading,
  isError,
  error,
  isFetching,
  refetch,
} = useQuery({
  queryKey: ["todos", filter],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 2,    // 2 minutes fresh
  gcTime: 1000 * 60 * 10,      // 10 minutes cache retention
  refetchOnWindowFocus: true,  // Auto refetch on tab focus
  retry: 3,                    // Retry 3 times on failure
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
  select: (data) => data.map(todo => ({ ...todo, titleUpper: todo.title.toUpperCase() })),
});`
      }
    ],
    playgroundCode: `// Exponential Backoff Retry Delay Simulation
function retryDelay(attempt) {
  return Math.min(1000 * 2 ** attempt, 30000);
}

console.log("Retry Attempt 0 delay:", retryDelay(0), "ms");
console.log("Retry Attempt 1 delay:", retryDelay(1), "ms");
console.log("Retry Attempt 2 delay:", retryDelay(2), "ms");
console.log("Retry Attempt 3 delay:", retryDelay(3), "ms");
return "Exponential backoff delays calculated cleanly!";`
  },
  {
    id: "react-query-cache-lifecycle",
    slug: "react-query/cache-lifecycle",
    category: "react-query",
    group: "React Query Core",
    title: "staleTime vs. gcTime Lifecycle Timeline",
    description: "The complete cache lifecycle: Fresh -> Stale -> Inactive -> Garbage Collection.",
    badge: "Architecture",
    readTime: "6 min read",
    summary: "Data fetched -> Cache is Fresh (staleTime active, no background refetch). staleTime Expired -> Data is Stale (returns cached data instantly + triggers silent background refetch). Component Unmounted -> Data is Inactive (gcTime countdown begins). gcTime Expired -> Garbage Collected (permanently removed from memory).",
    keyPoints: [
      "staleTime controls network activity (whether to refetch in the background).",
      "gcTime controls memory retention (how long unused queries stay cached).",
      "gcTime timer ONLY starts when ALL component instances using that queryKey unmount.",
    ],
    codeSnippets: [
      {
        title: "Timeline Logic in React Query",
        language: "javascript",
        code: `// Timeline Lifecycle:
// 1. Data Fetched -> Fresh (staleTime active)
// 2. staleTime expires -> Stale (Cached return + silent background refetch)
// 3. Component unmounts -> Inactive (gcTime timer starts)
// 4. gcTime expires -> Garbage Collected (removed from memory)`
      }
    ],
    playgroundCode: `// Simulating Cache State Transitions
function checkCacheStatus(timeSinceFetchMs, staleMs, gcMs, isMounted) {
  if (!isMounted && timeSinceFetchMs > gcMs) return "GARBAGE COLLECTED";
  if (timeSinceFetchMs < staleMs) return "FRESH (Zero network calls)";
  return "STALE (Instant cache display + silent background fetch)";
}

console.log("5 seconds after fetch (stale 30s):", checkCacheStatus(5000, 30000, 60000, true));
console.log("45 seconds after fetch (stale 30s):", checkCacheStatus(45000, 30000, 60000, true));
console.log("Unmounted for 90 seconds (gc 60s):", checkCacheStatus(90000, 30000, 60000, false));
return "Lifecycle transitions verified!";`
  },
  {
    id: "react-query-status-properties",
    slug: "react-query/status-properties",
    category: "react-query",
    group: "React Query Core",
    title: "3. Query Return Properties & States",
    description: "isLoading vs isFetching, status ('pending'|'error'|'success') vs fetchStatus ('fetching'|'paused'|'idle').",
    badge: "API",
    readTime: "6 min read",
    summary: "In TanStack Query v5, states are separated into two distinct dimensions: status represents data availability ('pending', 'error', 'success'), while fetchStatus represents network activity ('fetching', 'paused', 'idle').",
    keyPoints: [
      "isLoading: true ONLY on the very first empty fetch when no cache exists.",
      "isFetching: true whenever any network request is in progress (including background refetches).",
      "isStale: Boolean flag showing if data has exceeded staleTime.",
      "dataUpdatedAt: Millisecond timestamp of last successful fetch.",
      "refetch: Manual trigger function on demand.",
    ],
    codeSnippets: [
      {
        title: "Status vs FetchStatus Dimension Grid",
        language: "javascript",
        code: `// status: 'pending' | 'error' | 'success' (Data Availability)
// fetchStatus: 'fetching' | 'paused' | 'idle' (Network Activity)

// Examples:
// Initial fetch: status === 'pending' && fetchStatus === 'fetching' (isLoading = true)
// Background refetch: status === 'success' && fetchStatus === 'fetching' (isFetching = true, isLoading = false)
// Offline query: status === 'pending' && fetchStatus === 'paused'`
      }
    ],
    playgroundCode: `// Evaluating isLoading vs isFetching
function inspectQuery(hasData, isNetworkRunning) {
  const isLoading = !hasData && isNetworkRunning;
  const isFetching = isNetworkRunning;
  return { isLoading, isFetching, label: isLoading ? "Show Skeleton Spinner" : isFetching ? "Show Background Sync Dot" : "Idle Fresh" };
}

console.log("Initial Visit:", inspectQuery(false, true));
console.log("Background Tab Refetch:", inspectQuery(true, true));
return "Status dimensions prevent false full-screen loading spinners!";`
  },
  {
    id: "react-query-global-monitoring",
    slug: "react-query/global-monitoring",
    category: "react-query",
    group: "React Query Core",
    title: "4. Global Monitoring Hooks (useIsFetching, useIsMutating)",
    description: "Tracking global network activity across the entire application for headers and sync bars.",
    badge: "Hooks",
    readTime: "4 min read",
    summary: "TanStack Query provides global monitoring hooks to track activity across the entire application without drilling props or subscribing to individual queries.",
    keyPoints: [
      "`useIsFetching()`: Returns the number of queries currently fetching anywhere in the app.",
      "`useIsMutating()`: Returns the number of mutations currently executing anywhere in the app.",
      "Ideal for top progress bars, global header sync badges, or offline sync indicators.",
    ],
    codeSnippets: [
      {
        title: "Global Sync Indicator Header",
        language: "jsx",
        code: `import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function Header() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <header>
      {(isFetching > 0 || isMutating > 0) && (
        <span className="global-spinner">Syncing with server...</span>
      )}
    </header>
  );
}`
      }
    ],
    playgroundCode: `// Simulating Global Network Counters
let fetchingCount = 0;
let mutatingCount = 0;

function startQuery() { fetchingCount++; }
function endQuery() { fetchingCount--; }

startQuery();
startQuery();
console.log("Global isFetching count:", fetchingCount);
endQuery();
console.log("After one finishes:", fetchingCount);
return \`Global active requests: \${fetchingCount}\`;`
  },
  {
    id: "react-query-query-keys",
    slug: "react-query/query-keys",
    category: "react-query",
    group: "React Query Core",
    title: "5. The Power of queryKey & Parameters",
    description: "Cache segmentation by parameters and extracting params directly inside queryFn.",
    badge: "Core API",
    readTime: "5 min read",
    summary: "The `queryKey` is the unique cache identifier. Placing variables in the array creates independent cache slots (`['todos', 'all']`, `['todos', 'active']`), and parameters can be read directly inside `queryFn`.",
    keyPoints: [
      "Cache Segmentation: Each unique array permutation is cached independently.",
      "Instant Retrieval: Switching back to an already-visited key returns cached data with 0ms delay.",
      "Destructuring in queryFn: `const [, filter] = queryKey;` avoids scope binding issues.",
    ],
    codeSnippets: [
      {
        title: "Reading queryKey inside queryFn",
        language: "javascript",
        code: `const fetchTodos = async ({ queryKey }) => {
  const [, filter] = queryKey; // Extracts 'filter' parameter
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos", {
    params: {
      _limit: 5,
      completed: filter === "completed" ? true : filter === "active" ? false : undefined,
    },
  });
  return response.data;
};`
      }
    ],
    playgroundCode: `// Simulating queryKey parameter extraction
function parseQueryKey({ queryKey }) {
  const [scope, filter, page] = queryKey;
  return { scope, filter, page, apiEndpoint: \`/api/\${scope}?filter=\${filter}&page=\${page}\` };
}

const req = parseQueryKey({ queryKey: ["products", "electronics", 2] });
console.log("Resolved Request:", req);
return \`Target Endpoint: \${req.apiEndpoint}\`;`
  },
  {
    id: "react-query-use-mutation",
    slug: "react-query/use-mutation",
    category: "react-query",
    group: "React Query Core",
    title: "6 & 8. useMutation (POST, PUT, DELETE)",
    description: "Writing data, side effects, mutate vs mutateAsync, and lifecycle callbacks.",
    badge: "Core API",
    readTime: "6 min read",
    image: {
      src: "/use-mutation-flow.jpg",
      alt: "TanStack React Query useMutation Lifecycle Flow",
      caption: "useMutation Lifecycle Flow: onMutate -> server request -> onSuccess/onError -> onSettled."
    },
    demoComponent: "CompleteReactQueryComponent",
    demoTitle: "Live React Query Mutations Demo",
    summary: "While `useQuery` is for reading data, `useMutation` is for writing data and side effects (POST, PUT, PATCH, DELETE). It coordinates lifecycle callbacks: `onMutate`, `onError`, `onSuccess`, and `onSettled`.",
    keyPoints: [
      "`mutate(variables)`: Fire-and-forget execution with callbacks.",
      "`mutateAsync(variables)`: Returns a Promise for try/catch and async/await handling.",
      "`onSettled`: Always runs when finished (success or failure, like `finally`) to invalidate queries and resync.",
    ],
    codeSnippets: [
      {
        title: "useMutation Anatomy",
        language: "javascript",
        code: `const mutation = useMutation({
  mutationFn: async (newTodo) => {
    return await axios.post("/api/todos", newTodo);
  },
  onMutate: async (variables) => {
    // 1. Runs BEFORE mutation executes (used for Optimistic Updates)
    return { rollbackData };
  },
  onError: (error, variables, context) => {
    // 2. Runs if server request fails -> Revert cache using context!
  },
  onSuccess: (data, variables, context) => {
    // 3. Runs on server success (2xx HTTP response)
  },
  onSettled: (data, error, variables, context) => {
    // 4. Runs ALWAYS when finished -> Invalidate queries!
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});`
      }
    ],
    playgroundCode: `// Simulating mutate vs mutateAsync
async function mockMutateAsync(item) {
  console.log("mutateAsync started for:", item.title);
  await new Promise(r => setTimeout(r, 50));
  return { id: Date.now(), ...item };
}

mockMutateAsync({ title: "New Item" }).then(res => {
  console.log("mutateAsync Promise resolved:", res);
});
return "mutateAsync allows direct await / try-catch usage!";`
  },
  {
    id: "react-query-optimistic-updates",
    slug: "react-query/optimistic-updates",
    category: "react-query",
    group: "React Query Core",
    title: "7. Optimistic Updates, Context Rollback & Cache Mechanics",
    description: "0ms instant UI, context pipeline, defensive (old = []) => ... guards, prefix matching, and 3 mutation patterns.",
    badge: "Production",
    readTime: "8 min read",
    demoComponent: "CompleteReactQueryComponent",
    demoTitle: "Live Optimistic CRUD Demo",
    summary: "Optimistic Updates make your application feel instantaneous by updating the local UI cache immediately before the server responds. If the server request fails, the UI rolls back cleanly to the pre-mutation snapshot.",
    keyPoints: [
      "Why `return { previousTodos }` in `onMutate`? (The Context Pipeline): Captured by React Query and passed as `context` to `onError` and `onSettled` for rollback.",
      "Why `(old = []) => ...`? (Defensive Cache Guard): Prevents `TypeError: old is not iterable` crashes when the cache is cold/empty.",
      "Prefix Matching: `invalidateQueries({ queryKey: ['todos'] })` matches ALL filtered variants (`['todos', 'all']`, `['todos', 'active']`) automatically.",
      "Pattern A: Add Item (POST) with Optimistic Update & Rollback.",
      "Pattern B: Update Item (PUT / PATCH) with Invalidation.",
      "Pattern C: Delete Item (DELETE) with Optimistic Removal & Rollback.",
    ],
    codeSnippets: [
      {
        title: "Pattern A: Add Item with Optimistic Update & Rollback",
        language: "javascript",
        code: `const addMutation = useMutation({
  mutationFn: (newTodo) => axios.post("/api/todos", newTodo),

  onMutate: async (newTodoVariables) => {
    await queryClient.cancelQueries({ queryKey: ["todos", filter] });
    const previousTodos = queryClient.getQueryData(["todos", filter]);

    // Optimistically update cache with defensive default array
    queryClient.setQueryData(["todos", filter], (old = []) => [
      { id: Date.now(), title: newTodoVariables.title, completed: false },
      ...old,
    ]);

    return { previousTodos };
  },

  onError: (err, newTodo, context) => {
    queryClient.setQueryData(["todos", filter], context?.previousTodos);
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] }); // Prefix invalidates all!
  },
});`
      }
    ],
    playgroundCode: `// Simulating Optimistic Update & Rollback
let cache = [{ id: 1, text: "Task 1" }];

function optimisticAdd(text, serverFails = true) {
  const snapshot = [...cache];
  // 1. Optimistic insert
  cache = [{ id: Date.now(), text }, ...cache];
  console.log("UI Updated Instantly (0ms delay):", cache);

  // 2. Server response
  if (serverFails) {
    console.log("Server returned 500 error! Reverting to snapshot...");
    cache = snapshot; // Rollback
    console.log("Cache reverted safely:", cache);
  }
}

optimisticAdd("Task 2 (Optimistic)", true);
return "Optimistic update and rollback verified!";`
  },
  {
    id: "react-query-pagination-prev-next",
    slug: "react-query/pagination-prev-next",
    category: "react-query",
    group: "React Query Pagination",
    title: "10. Method 1: Previous / Next Pagination",
    description: "Zero-flicker transitions using placeholderData: keepPreviousData and safe boundary guards.",
    badge: "Core",
    readTime: "6 min read",
    image: {
      src: "/react-query-pagination.jpg",
      alt: "Understanding Pagination in React & Web Apps",
      caption: "Smooth data transitions with placeholderData: keepPreviousData."
    },
    demoComponent: "ProductList",
    demoTitle: "Live Prev/Next Pagination",
    summary: "In regular React, navigating pages unmounts the previous list and flashes a blank screen or loading spinner. With `placeholderData: keepPreviousData`, TanStack Query keeps showing the old page data until the new page data is completely finished downloading in the background.",
    keyPoints: [
      "`placeholderData: keepPreviousData`: Old page stays visible on screen with zero flickering.",
      "`disabled={page === 1}`: Disables previous button on page 1.",
      "`Math.max(old - 1, 1)`: Safe mathematical guard to ensure the page number never drops below 1.",
      "`!isPlaceholderData`: Prevents users from spam-clicking the Next button while loading.",
    ],
    codeSnippets: [
      {
        title: "Previous/Next Query Hook (pagination.js)",
        language: "javascript",
        code: `import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async ({ queryKey }) => {
  const [, page] = queryKey; 
  const response = await axios.get(\`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=5\`);
  return response.data;
};

export function usePaginatedProducts(page) {
  return useQuery({
    queryKey: ['products', page],       // Unique cache for every page!
    queryFn: fetchProducts,
    placeholderData: keepPreviousData, // Keeps old data visible
    staleTime: 1000 * 60 * 5,          // 5 minutes fresh
  });
}`
      }
    ],
    playgroundCode: `// Simulating keepPreviousData Behavior
let currentPage = 1;
let visibleData = ["Page 1: Product 1", "Page 1: Product 2"];

function goToPage(newPage) {
  console.log(\`Fetching page \${newPage}... Screen continues showing:\`, visibleData);
  // Simulating server download completion
  setTimeout(() => {
    currentPage = newPage;
    visibleData = [\`Page \${newPage}: Product A\`, \`Page \${newPage}: Product B\`];
    console.log("New page arrived! Seamless swap:", visibleData);
  }, 100);
}

goToPage(2);
return "keepPreviousData prevents screen flickering and jumps!";`
  },
  {
    id: "react-query-pagination-numbered",
    slug: "react-query/pagination-numbered",
    category: "react-query",
    group: "React Query Pagination",
    title: "10. Method 2: Numbered Page Pagination",
    description: "Direct page jumping, reading totalCount from headers, Math.ceil calculation, and page number buttons.",
    badge: "Core",
    readTime: "6 min read",
    demoComponent: "NumberedPaginationComponent",
    demoTitle: "Live Numbered Pagination Demo",
    summary: "Numbered pagination displays numeric buttons (`[1] [2] [3] ... [20]`) allowing users to jump directly to any page. To generate page numbers, we read the total item count from API response headers (`x-total-count`).",
    keyPoints: [
      "`Math.ceil((data?.totalCount || 0) / limit)`: Rounds up to prevent losing the last partial page.",
      "`Array.from({ length: totalPages }, (_, i) => i + 1)`: Generates array of page numbers.",
      "`page === pageNum`: Highlights the active page button.",
    ],
    codeSnippets: [
      {
        title: "Numbered Pagination Implementation (NumberedPaginationComponent.jsx)",
        language: "jsx",
        code: `export default function NumberedPaginationComponent() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isFetching } = usePaginatedProducts(page);

  const totalPages = Math.ceil((data?.totalCount || 0) / limit);
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <h2>Products (Page {page} of {totalPages})</h2>
      {pagesArray.map(pageNum => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          style={{ backgroundColor: page === pageNum ? '#007bff' : '#f8f9fa' }}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
}`
      }
    ],
    playgroundCode: `// Calculating Numbered Page Buttons
const totalCount = 100;
const limit = 5;
const totalPages = Math.ceil(totalCount / limit);
const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

console.log("Total Count:", totalCount);
console.log("Calculated Total Pages:", totalPages);
console.log("First 5 Page Buttons:", pagesArray.slice(0, 5));
return \`Generated \${totalPages} page buttons from totalCount.\`;`
  },
  {
    id: "react-query-pagination-comparison",
    slug: "react-query/pagination-comparison",
    category: "react-query",
    group: "React Query Pagination",
    title: "Comparison Summary: Prev/Next vs. Numbered",
    description: "Trade-offs, API requirements, UI controls, and user experience decision matrix.",
    badge: "Reference",
    readTime: "4 min read",
    summary: "Choosing between Previous/Next and Numbered Page pagination depends on backend capabilities and screen size. Previous/Next requires only current page data, whereas Numbered Pagination requires knowing the total item count.",
    keyPoints: [
      "Method 1 (Prev/Next): Only needs current page items. Ideal for mobile feeds and simple lists.",
      "Method 2 (Numbered): Needs totalCount of all items. Ideal for admin tables and e-commerce catalogs.",
      "Both methods leverage `keepPreviousData` for 100% zero-flicker transitions.",
    ],
    codeSnippets: [
      {
        title: "Pagination Decision Matrix",
        language: "javascript",
        code: `// Method 1: Previous / Next
// - API requirement: Only needs current page items
// - UI controls: Simple [Previous] and [Next] buttons
// - Best used for: Mobile screens, feeds, simple lists
// - Direct jump: Can only step +1 or -1 page

// Method 2: Numbered Pages
// - API requirement: Needs totalCount of all items (headers)
// - UI controls: Number buttons [1] [2] [3] ...
// - Best used for: Admin tables, e-commerce product catalogs
// - Direct jump: Can jump directly to any page number`
      }
    ],
    playgroundCode: `// Pagination Choice Evaluator
function choosePagination(hasTotalCount, isMobile) {
  if (isMobile || !hasTotalCount) return "Use Method 1: Previous / Next Pagination";
  return "Use Method 2: Numbered Page Pagination";
}

console.log("Mobile feed (no total count):", choosePagination(false, true));
console.log("Admin table (total count known):", choosePagination(true, false));
return "Decision matrix evaluated successfully!";`
  },
  {
    id: "react-query-infinite-scroll",
    slug: "react-query/infinite-scroll",
    category: "react-query",
    group: "React Query Infinite",
    title: "11. Infinite Scroll with useInfiniteQuery",
    description: "Continuous feeds (Instagram, TikTok), stacked data.pages arrays, getNextPageParam, hasNextPage, and fetchNextPage.",
    badge: "Core",
    readTime: "7 min read",
    image: {
      src: "/react-query-infinite-scroll.jpg",
      alt: "Understanding Infinite Scroll in TanStack React Query",
      caption: "useInfiniteQuery data flow: stacked data.pages cache and getNextPageParam cursor resolution."
    },
    secondaryImage: {
      src: "/InfiniteByMyhand.png",
      alt: "Author Conceptual Sketch of Infinite Scroll",
      caption: "Author sketch: Stacking arrays and fetching next page dynamically."
    },
    demoComponent: "InfiniteScrollComponent",
    demoTitle: "Live Infinite Scroll Feed Demo",
    summary: "Infinite Scroll provides a continuous, seamless content stream—popularized by social media feeds like Instagram, TikTok, and Twitter/X. Data loads dynamically as the user scrolls or clicks 'Load More', and new batches are appended without replacing previous items.",
    keyPoints: [
      "Stacked Pages: `data.pages` stores an array of page responses without discarding earlier pages.",
      "`getNextPageParam`: Determines the parameter for the next page by checking server responses (returns next page or `undefined` when done).",
      "`hasNextPage`: Boolean indicating if more pages are available.",
      "`fetchNextPage()`: The trigger function invoked on button click or scroll detection.",
      "`isFetchingNextPage`: Distinguishes subsequent page fetches from the initial page load.",
    ],
    codeSnippets: [
      {
        title: "useInfiniteQuery Hook & Component",
        language: "javascript",
        code: `// Hook
export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ['infiniteProducts'],
    queryFn: fetchInfiniteProducts,
    initialPageParam: 1, // Starting page param
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

// Component Consumption
// data.pages.map((pageGroup, i) => pageGroup.products.map(p => ...))
// <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>`
      }
    ],
    playgroundCode: `// Simulating Stacked Pages Structure
const queryCache = {
  pages: [
    { items: ["Item 1", "Item 2"], nextPage: 2 },
    { items: ["Item 3", "Item 4"], nextPage: 3 },
    { items: ["Item 5", "Item 6"], nextPage: undefined }, // End reached!
  ],
  pageParams: [1, 2, 3]
};

// Flatten all stacked pages for continuous rendering
const feed = queryCache.pages.flatMap(p => p.items);
console.log("Flattened Feed Items:", feed);

const lastPage = queryCache.pages[queryCache.pages.length - 1];
const hasNextPage = lastPage.nextPage !== undefined;
console.log("Has more pages?", hasNextPage);
return \`Feed has \${feed.length} items stacked seamlessly.\`;`
  },

  // =========================================================================
  // 7. ROADMAP & NEXT-GEN
  // =========================================================================
  {
    id: "jotai-atomic",
    slug: "jotai",
    category: "roadmap",
    group: "Roadmap",
    title: "Jotai (Atomic State Primitives)",
    description: "Bottom-up atomic state architecture for React with zero boilerplate.",
    badge: "Roadmap",
    readTime: "4 min read",
    summary: "Jotai takes an atomic approach to React state management. Atoms are small, independent units of state that can be combined, derived, and subscribed to independently, eliminating unnecessary re-renders with minimal overhead.",
    keyPoints: [
      "Bottom-up atomic state architecture.",
      "Zero boilerplate: `atom(0)` creates a self-contained reactive primitive.",
      "Derived atoms: compute derived state automatically without re-render cascades.",
    ],
    codeSnippets: [
      {
        title: "Concept Preview: Atomic State in Jotai",
        language: "javascript",
        code: `import { atom, useAtom } from "jotai";

export const countAtom = atom(0);
export const doubleAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [double] = useAtom(doubleAtom);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count} ({double})</button>;
}`
      }
    ],
    playgroundCode: `// Simulating Atomic State
let count = 5;
const double = () => count * 2;

console.log("Atom count:", count);
console.log("Derived atom double:", double());
count = 12;
console.log("After update -> double is:", double());
return "Atoms derive values automatically!";`
  },
  {
    id: "valibot-validation",
    slug: "valibot",
    category: "roadmap",
    group: "Roadmap",
    title: "Valibot (Tree-Shakeable Schema Validation)",
    description: "Modular, sub-kilobyte schema validation for forms and API responses.",
    badge: "Roadmap",
    readTime: "4 min read",
    summary: "Valibot is a 98% smaller alternative to Zod and Yup. Built with a modular functional architecture, bundlers only package the validation functions your app actually imports, drastically shrinking client bundle sizes.",
    keyPoints: [
      "Tree-shakeable architecture (sub-kilobyte footprint).",
      "Full TypeScript type inference via `InferOutput<typeof Schema>`.",
      "Composable custom error messages and transformations.",
    ],
    codeSnippets: [
      {
        title: "Concept Preview: Valibot Schema Validation",
        language: "javascript",
        code: `import * as v from "valibot";

export const UserSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2, "Min 2 chars")),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

const result = v.safeParse(UserSchema, { name: "Kamal", email: "kamal@example.com" });
console.log("Is valid?", result.success);`
      }
    ],
    playgroundCode: `// Simulating Modular Schema Validation
function validateUser(data) {
  const errors = [];
  if (!data.name || data.name.length < 2) errors.push("Name too short");
  if (!data.email || !data.email.includes("@")) errors.push("Invalid email");
  return { success: errors.length === 0, errors };
}

console.log(validateUser({ name: "K", email: "bad-email" }));
console.log(validateUser({ name: "Kamal", email: "kamal@test.com" }));
return "Validation successful!";`
  },
  {
    id: "auth-jwt-architecture",
    slug: "auth-jwt",
    category: "roadmap",
    group: "Roadmap",
    title: "Enterprise JWT Authentication & Token Rotation",
    description: "Axios interceptors, silent refresh queues, and protected React routing.",
    badge: "Roadmap",
    readTime: "5 min read",
    summary: "Enterprise authentication architectures require secure token storage (HttpOnly cookies vs. memory), automatic Authorization header injection via interceptors, and non-blocking silent refresh rotation.",
    keyPoints: [
      "Token storage trade-offs: Memory storage vs. HttpOnly cookies.",
      "Axios request interceptor for automatic Bearer token injection.",
      "401 Response queue for non-blocking silent refresh rotation.",
    ],
    codeSnippets: [
      {
        title: "Concept Preview: Axios Auth Interceptor with Refresh Queue",
        language: "javascript",
        code: `apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const { data } = await axios.post("/api/auth/refresh");
      localStorage.setItem("token", data.token);
      return apiClient(original);
    }
    return Promise.reject(error);
  }
);`
      }
    ],
    playgroundCode: `// Simulating Token Refresh Queue
let accessToken = "expired_token";

async function makeRequest() {
  if (accessToken === "expired_token") {
    console.log("Token expired (401). Calling /auth/refresh...");
    accessToken = "new_valid_token_2026";
    console.log("Token refreshed successfully! Retrying request with:", accessToken);
  }
  return "Data received securely!";
}

makeRequest().then(res => console.log(res));
return "Silent token refresh executed successfully!";`
  }
];

// Helper functions for retrieval and linear navigation
export function getTopicBySlug(slug) {
  if (!slug) return TOPICS[0];
  const cleanSlug = slug.replace(/^\/docs\/?/, "").replace(/\/$/, "");
  return TOPICS.find((t) => t.slug === cleanSlug) || null;
}

export function getAllTopics() {
  return TOPICS;
}

export function getGroupedTopics() {
  const groups = {};
  TOPICS.forEach((topic) => {
    if (!groups[topic.category]) {
      groups[topic.category] = [];
    }
    groups[topic.category].push(topic);
  });
  return groups;
}

export function getAdjacentTopics(currentSlug) {
  const currentIndex = TOPICS.findIndex((t) => t.slug === currentSlug);
  if (currentIndex === -1) return { prev: null, next: null };
  return {
    prev: currentIndex > 0 ? TOPICS[currentIndex - 1] : null,
    next: currentIndex < TOPICS.length - 1 ? TOPICS[currentIndex + 1] : null,
  };
}

export function getRecommendedTopics(currentSlug, count = 4) {
  const currentTopic = getTopicBySlug(currentSlug);
  if (!currentTopic) return TOPICS.slice(0, count);

  // Other topics from same category first, then from other categories
  const sameCategory = TOPICS.filter(
    (t) => t.category === currentTopic.category && t.slug !== currentTopic.slug
  );
  const otherCategories = TOPICS.filter(
    (t) => t.category !== currentTopic.category && t.slug !== currentTopic.slug
  );

  return [...sameCategory, ...otherCategories].slice(0, count);
}

