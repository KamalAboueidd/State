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
