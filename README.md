# DirectState-_Management-
Zustand , Redux , Jotai ,Valito , annd more....

# Zustand

Zustand is a small and simple state management library for React.
It helps us create a global store with state and actions.
It has a simple API and needs less code than many other state libraries.

 ![Zustand](zustand-vs-redux-toolkit-for-react-state-managemen-1770720374772.png)
 ![Zustand](zustand.webp)
 ![Zustand](zustand1.png)
 ![Zustand](zustand2.png)

## Creating a Store

We use `create` to create a Zustand store.
The store can contain state values and actions.
The `set` function is used to update the state.

```js
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - 1,
    })),
}));

export default useStore;
```

## Updating State

Zustand updates the state by using the `set` function.
We do not need to copy the whole store manually.
Only the values returned from `set` will be updated.

```js
const useStore = create((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));
```

## Immer Middleware

Immer makes it easier to update complex state.
We can write state updates like normal JavaScript code.
Immer keeps the state immutable for us.

```js
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useArray = create(
  immer((set) => ({
    todos: [],

    addTodo: (newTodo) =>
      set((state) => {
        state.todos.push(newTodo);
      }),
  }))
);
```

## Store Slice Pattern

The Slice Pattern helps us split a large store into smaller parts.
Each slice can contain its own state and actions.
For example, we can create an Auth slice and a Cart slice.

```js
export const createAuthSlice = (set) => ({
  user: null,

  login: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      user: null,
    }),
});

export const createCartSlice = (set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  removeFromCart: (item) =>
    set((state) => ({
      cart: state.cart.filter((i) => i !== item),
    })),
});
```

## Combining Slices

We can combine multiple slices into one Zustand store.
This keeps the code organized when the application becomes larger.
The final store contains the state and actions from all slices.

```js
import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createCartSlice } from "./cartSlice";

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));
```

## Accessing Store Values

We can access store values and actions using the store hook.
A selector lets us choose only the value we need.
This can help avoid unnecessary component updates.

```js
function Header() {
  const user = useBoundStore((state) => state.user);
  const logout = useBoundStore((state) => state.logout);

  return (
    <header>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <span>Not logged in</span>
      )}
    </header>
  );
}
```

## useShallow

`useShallow` is useful when we need multiple values from the store.
It compares the selected values and can help avoid unnecessary re-renders.
It is useful when selecting several related values together.

```js
import { useShallow } from "zustand/react/shallow";

const { cart, addToCart } = useBoundStore(
  useShallow((state) => ({
    cart: state.cart,
    addToCart: state.addToCart,
  }))
);
```

## Persist Middleware

The `persist` middleware saves store data in browser storage.
It can use `localStorage` by default.
We can also choose which parts of the state should be saved.

```js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
      }),

      version: 1,
    }
  )
);
```

## subscribeWithSelector

`subscribeWithSelector` lets us watch a specific value in the store.
The callback runs when the selected value changes.
It can be useful for analytics or logic outside React components.

```js
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector((set) => ({
    count: 0,

    increment: () =>
      set((state) => ({
        count: state.count + 1,
      })),
  }))
);

useStore.subscribe(
  (state) => state.count,
  (currentCount, previousCount) => {
    console.log(
      `Counter changed from ${previousCount} to ${currentCount}`
    );
  }
);
```

## Redux DevTools

Zustand can work with Redux DevTools for debugging.
It lets us see state changes and actions while developing.
It also supports time travel between previous states.

```js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    (set) => ({
      count: 0,

      increment: () =>
        set(
          (state) => ({
            count: state.count + 1,
          }),
          false,
          "counter/increment"
        ),
    }),
    {
      name: "Awesome Store",
    }
  )
);
```

## Middleware

Zustand middleware adds extra features to a store.
For example, `persist` saves state, `devtools` helps with debugging,
and `subscribeWithSelector` lets us listen to specific state changes.

```js
import { create } from "zustand";
import {
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        count: 0,

        increment: () =>
          set((state) => ({
            count: state.count + 1,
          })),
      })),
      {
        name: "counter-storage",
      }
    ),
    {
      name: "Counter Store",
    }
  )
);
```
# Redux Toolkit Notes
## 1. Redux Fundamentals
Redux is a state management library.
It helps us manage shared data in one central store.
The main idea is:
UI → Dispatch Action → Reducer → Update State → UI
### State
State is the data stored inside Redux.
Example:
    const initialState = {
      count: 0,
      user: null
    };
Here, `count` and `user` are part of the state.
### Action
An action tells Redux what happened.
Example:
    {
      type: "counter/increment"
    }
An action can also send data using `payload`.
    {
      type: "counter/add",
      payload: 5
    }
### Reducer
A reducer is a function that decides how the state changes.
    const counterReducer = (state, action) => {
      if (action.type === "counter/increment") {
        return {
          ...state,
          count: state.count + 1
        };
      }
      return state;
    };

### Dispatch

`dispatch` sends an action to Redux.
    dispatch({
      type: "counter/increment"
    });
The action goes to the reducer.
The reducer updates the state.
Then React gets the new state.
---
## 2. Installation & Setup
For a React project, install these packages:
    npm install @reduxjs/toolkit react-redux
`@reduxjs/toolkit` gives us the tools to build Redux applications.
`react-redux` connects Redux with React.
### Create the Store
The Store is the central place that contains our Redux state.
    import { configureStore } from "@reduxjs/toolkit";
    export const store = configureStore({
      reducer: {}
    });
### Provider
We use `Provider` to make the Store available to React components.
    import { Provider } from "react-redux";
    import { store } from "./store";

    <Provider store={store}>
      <App />
    </Provider>

Now all components inside `Provider` can access the Redux Store.
---
## 3. createSlice & Store
`createSlice` is one of the most important tools in Redux Toolkit.
It puts the state, reducers, and actions together in one place.
### Example
    import { createSlice } from "@reduxjs/toolkit";
    const counterSlice = createSlice({
      name: "counter",
      initialState: {
        count: 0
      },
      reducers: {
        increment: (state) => {
          state.count += 1;
        },

        decrement: (state) => {
          state.count -= 1;
        }
      }
    });
    export const { increment, decrement } = counterSlice.actions;
    export default counterSlice.reducer;
### createSlice Parts
`name` is the name of the slice.
    name: "counter"
`initialState` is the first state.
    initialState: {
      count: 0
    }
`reducers` contains the functions that change the state.
    reducers: {
      increment: (state) => {
        state.count += 1;
      }
    }
Redux Toolkit also creates the actions for us.
    export const { increment, decrement } = counterSlice.actions;
Now we can use:
    dispatch(increment());
### Immer
Redux normally needs immutable updates.
But Redux Toolkit uses Immer internally.
So we can write:
    state.count += 1;
Instead of writing:
    return {
      ...state,
      count: state.count + 1
    };
Immer creates the immutable update for us.
### Add the Slice to the Store

    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from "./counterSlice";

    export const store = configureStore({
      reducer: {
        counter: counterReducer
      }
    });

Now the Redux state looks like this:

    {
      counter: {
        count: 0
      }
    }
---
## 4. React Hooks
React-Redux gives us two main hooks:
- `useSelector` → Read data from the Store.
- `useDispatch` → Send actions to the Store.
### useSelector
`useSelector` is used to read data from Redux.
    import { useSelector } from "react-redux";
    const count = useSelector((state) => state.counter.count);
Here:
    state.counter.count
means:
- `state` → the Redux Store state.
- `counter` → our counter slice.
- `count` → the value we want.

### useDispatch

`useDispatch` gives us the `dispatch` function.
    import { useDispatch } from "react-redux";
    import { increment } from "./counterSlice";
    const dispatch = useDispatch();
    dispatch(increment());
This sends the `increment` action to Redux.
### Full Example
    import { useSelector, useDispatch } from "react-redux";
    import { increment, decrement } from "./counterSlice";

    function Counter() {
      const count = useSelector((state) => state.counter.count);
      const dispatch = useDispatch();

      return (
        <div>
          <p>{count}</p>

          <button onClick={() => dispatch(increment())}>
            +
          </button>

          <button onClick={() => dispatch(decrement())}>
            -
          </button>
        </div>
      );
    }
The flow is:
    User clicks button
          ↓
    dispatch(increment())
          ↓
    Reducer runs
          ↓
    State changes
          ↓
    useSelector gets new value
          ↓
    Component re-renders
---
## 5. Selectors & createSelector
A Selector is a function that reads a specific part of the Redux state.
Example:
    const selectCount = (state) => state.counter.count;
We can use it with `useSelector`.
    const count = useSelector(selectCount);
Selectors make our code cleaner because we can reuse them.
### Derived Data
Sometimes we do not need the data directly.
We need to calculate new data from the Store.
Example:
    const selectTodos = (state) => state.todos.items;

    const selectCompletedTodos = (state) =>
      state.todos.items.filter((todo) => todo.completed);

Here, `selectCompletedTodos` creates new data from the existing state.
This is called **derived data**.
### The Problem
Every time the selector runs, `filter()` creates a new array.
    const selectCompletedTodos = (state) =>
     state.todos.items.filter((todo) => todo.completed);
A new array is created every time.
This can cause unnecessary work and re-renders in some cases.
### createSelector
`createSelector` helps us memoize selectors.
Memoization means:
> If the input did not change, return the previous result.
Example:
    import { createSelector } from "@reduxjs/toolkit";
    const selectTodos = (state) => state.todos.items;
    const selectCompletedTodos = createSelector(
      [selectTodos],
      (todos) => todos.filter((todo) => todo.completed)
    );
Now `selectCompletedTodos` remembers the previous result.
If `todos` did not change, it can return the same result instead of creating a new array again.
### Using createSelector with React
    const completedTodos = useSelector(selectCompletedTodos);
The component gets the calculated data from the selector.
### Simple Example
State:
    {
      todos: [
        { id: 1, text: "Learn Redux", completed: true },
        { id: 2, text: "Learn React", completed: false },
        { id: 3, text: "Practice RTK", completed: true }
      ]
   }
Selector:
    const selectCompletedTodos = createSelector(
      [(state) => state.todos],
      (todos) => todos.filter((todo) => todo.completed)
    );
Result
    [
      { id: 1, text: "Learn Redux", completed: true },
      { id: 3, text: "Practice RTK", completed: true }
    ] 
The important idea is:
    State
      ↓
    Selector
      ↓
    Derived Data
      ↓
    React Component
### Why Memoization?
Without memoization:
    State → Selector → New Result
With `createSelector`:
    Same Input
        ↓
    Same Result
So `createSelector` can reduce unnecessary calculations and help avoid unnecessary re-renders.
### Important Note
`createSelector` does not stop all React re-renders.
It mainly helps by returning the same result when its inputs have not changed.
Use it when you have expensive calculations or derived data.
---
## Summary

Redux has a simple flow:
    UI
     ↓
    dispatch(action)
     ↓
    reducer
     ↓
    state update
     ↓
    UI
The most important concepts we learned:
- Store → Holds the global state.
- State → The application data.
- Action → Describes what happened.
- Reducer → Changes the state.
- Dispatch → Sends an action.
- `createSlice` → Creates reducers and actions together.
- `Provider` → Connects Redux with React.
- `useSelector` → Reads data.
- `useDispatch` → Sends actions.
- Selector → Reads or calculates data from the state.
- `createSelector` → Creates memoized selectors for derived data.