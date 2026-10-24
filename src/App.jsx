import { useState } from "react";

// 1. React Query (TanStack Query)
import PostsQuery from "./react-query/PostsQuery";
import ProductsComponent from "./react-query/QueryClintExample";
import CompleteReactQueryComponent from "./react-query/useMutationExampple";

// 2. Redux Toolkit Demos
import CounterRTK from "./pages/redux/CounterRTK";
import PostsList from "./pages/redux/Postslist";
import Courses from "./pages/redux/Courses";
import LoginComponent from "./pages/redux/LoginComponent";
import DashboardComponent from "./pages/redux/DashboardComponent";

// 3. Zustand Demo
import CounterZustand from "./pages/zustand/CounterZustand";

// 4. RTK Query Demo
import RtkQueryPosts from "./pages/redux/RtkQueryPosts";

export default function App() {
  const [activeTab, setActiveTab] = useState("advanced-mutations");

  return (
    <div>
      {/* شريط أزرار لاختيار المكتبة اللي بتجربها */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", borderBottom: "1px solid #cbd5e1", paddingBottom: "12px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("advanced-mutations")}
          style={{ background: activeTab === "advanced-mutations" ? "#0284c7" : "#fff", color: activeTab === "advanced-mutations" ? "#fff" : "#000" }}
        >
          React Query (Advanced CRUD & Optimistic)
        </button>

        <button
          onClick={() => setActiveTab("react-query-example")}
          style={{ background: activeTab === "react-query-example" ? "#0284c7" : "#fff", color: activeTab === "react-query-example" ? "#fff" : "#000" }}
        >
          React Query (Products Example)
        </button>

        <button
          onClick={() => setActiveTab("react-query")}
          style={{ background: activeTab === "react-query" ? "#0284c7" : "#fff", color: activeTab === "react-query" ? "#fff" : "#000" }}
        >
          React Query (Simple Mutation)
        </button>

        <button
          onClick={() => setActiveTab("redux-counter")}
          style={{ background: activeTab === "redux-counter" ? "#0284c7" : "#fff", color: activeTab === "redux-counter" ? "#fff" : "#000" }}
        >
          Redux Counter
        </button>

        <button
          onClick={() => setActiveTab("redux-posts")}
          style={{ background: activeTab === "redux-posts" ? "#0284c7" : "#fff", color: activeTab === "redux-posts" ? "#fff" : "#000" }}
        >
          Redux Posts
        </button>

        <button
          onClick={() => setActiveTab("courses")}
          style={{ background: activeTab === "courses" ? "#0284c7" : "#fff", color: activeTab === "courses" ? "#fff" : "#000" }}
        >
          Courses (Entity)
        </button>

        <button
          onClick={() => setActiveTab("login")}
          style={{ background: activeTab === "login" ? "#0284c7" : "#fff", color: activeTab === "login" ? "#fff" : "#000" }}
        >
          Redux Login
        </button>

        <button
          onClick={() => setActiveTab("dashboard")}
          style={{ background: activeTab === "dashboard" ? "#0284c7" : "#fff", color: activeTab === "dashboard" ? "#fff" : "#000" }}
        >
          UI Slice (Dashboard)
        </button>

        <button
          onClick={() => setActiveTab("zustand")}
          style={{ background: activeTab === "zustand" ? "#0284c7" : "#fff", color: activeTab === "zustand" ? "#fff" : "#000" }}
        >
          Zustand
        </button>

        <button
          onClick={() => setActiveTab("rtk-query")}
          style={{ background: activeTab === "rtk-query" ? "#0284c7" : "#fff", color: activeTab === "rtk-query" ? "#fff" : "#000" }}
        >
          RTK Query
        </button>
      </div>

      {/* المكون المختار للتجربة */}
      {activeTab === "advanced-mutations" && <CompleteReactQueryComponent />}
      {activeTab === "react-query-example" && <ProductsComponent />}
      {activeTab === "react-query" && <PostsQuery />}
      {activeTab === "redux-counter" && <CounterRTK />}
      {activeTab === "redux-posts" && <PostsList />}
      {activeTab === "courses" && <Courses />}
      {activeTab === "login" && <LoginComponent />}
      {activeTab === "dashboard" && <DashboardComponent />}
      {activeTab === "zustand" && <CounterZustand />}
      {activeTab === "rtk-query" && <RtkQueryPosts />}
    </div>
  );
}
