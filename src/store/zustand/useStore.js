import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

// ==========================================
// 1. Basic Store (Counter Example)
// ==========================================
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decreament: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;

// ==========================================
// 2. Slice Pattern in Zustand
// ==========================================
export const createAuthSlice = (set) => ({
  user: null,
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
});

export const createCartSlice = (set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (item) =>
    set((state) => ({ cart: state.cart.filter((i) => i !== item) })),
});

// Root Bound Store
export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));

// ==========================================
// 3. Persist Middleware (LocalStorage)
// ==========================================
export const useAuthStorePersist = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
      version: 1,
    }
  )
);

// ==========================================
// 4. Devtools & subscribeWithSelector Example
// ==========================================
export const useStoreWithDevtools = create(
  devtools(
    subscribeWithSelector((set) => ({
      count: 0,
      increase: () =>
        set(
          (state) => ({ count: state.count + 1 }),
          false,
          "counter/increment"
        ),
    })),
    { name: "ZustandAppStore" }
  )
);
