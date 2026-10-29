import React from "react";

// Zustand Demo
import CounterZustand from "../../pages/zustand/CounterZustand";

// Redux Toolkit Demos
import CounterRTK from "../../pages/redux/CounterRTK";
import PostsList from "../../pages/redux/Postslist";
import Courses from "../../pages/redux/Courses";
import LoginComponent from "../../pages/redux/LoginComponent";
import DashboardComponent from "../../pages/redux/DashboardComponent";
import RtkQueryPosts from "../../pages/redux/RtkQueryPosts";

// React Query Demos
import CompleteReactQueryComponent from "../../react-query/useMutationExampple";
import ProductsComponent from "../../react-query/QueryClintExample";
import PostsQuery from "../../react-query/PostsQuery";
import ProductList from "../../react-query/pagination/PrevNext/ProductList";
import NumberedPaginationComponent from "../../react-query/pagination/Numbered/NumberedPaginationComponent";
import InfiniteScrollComponent from "../../react-query/infiniteScroll/InfiniteScrollComponent";

const DEMO_COMPONENTS = {
  CounterZustand: { component: CounterZustand, name: "Zustand Counter Store" },
  CounterRTK: { component: CounterRTK, name: "Redux Toolkit Counter Slice" },
  PostsList: { component: PostsList, name: "Redux createAsyncThunk Posts" },
  Courses: { component: Courses, name: "Redux Entity Adapter Courses CRUD" },
  LoginComponent: { component: LoginComponent, name: "Redux Auth / Login Slice" },
  DashboardComponent: { component: DashboardComponent, name: "Redux UI Drawer / Dashboard" },
  RtkQueryPosts: { component: RtkQueryPosts, name: "RTK Query Auto-Caching & Mutation" },
  CompleteReactQueryComponent: { component: CompleteReactQueryComponent, name: "React Query Optimistic Mutations & Rollback" },
  ProductsComponent: { component: ProductsComponent, name: "React Query Basic QueryClient" },
  PostsQuery: { component: PostsQuery, name: "React Query useQuery Lifecycle" },
  ProductList: { component: ProductList, name: "React Query Prev/Next Pagination" },
  NumberedPaginationComponent: { component: NumberedPaginationComponent, name: "React Query Numbered Pagination" },
  InfiniteScrollComponent: { component: InfiniteScrollComponent, name: "React Query useInfiniteQuery Scroll Feed" },
};

export default function DemoRenderer({ demoId }) {
  if (!demoId || !DEMO_COMPONENTS[demoId]) {
    return (
      <div className="demo-placeholder">
        <p>No interactive demo configured for this topic yet.</p>
      </div>
    );
  }

  const { component: ComponentInstance, name } = DEMO_COMPONENTS[demoId];

  return (
    <div className="demo-live-frame">
      <div className="demo-live-header">
        <span className="demo-badge">Live Interactive Component</span>
        <span className="demo-name">{name}</span>
      </div>
      <div className="demo-live-body">
        <ComponentInstance />
      </div>
    </div>
  );
}
