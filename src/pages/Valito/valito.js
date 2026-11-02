import { proxy } from "valtio";

export const state = proxy({
  count: 0,
  user: {
    name: "Kamal Abou Eid",
    isLoggedIn: true,
  },
});

// Direct mutable state via JavaScript Proxy:
// No actions, no reducers, no complex dispatch ceremony!
