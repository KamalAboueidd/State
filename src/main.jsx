import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Redux Provider
import { Provider } from "react-redux";
import { store } from "./store/redux/store.js";

// React Query Provider
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // magic tool to monitor the cache
import { queryClient } from "./react-query/queryClient.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} /> {/* hidden by default */}
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
