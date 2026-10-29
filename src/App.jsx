import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import DocumentationView from "./components/docs/DocumentationView";
import NotFoundView from "./components/docs/NotFoundView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/docs/zustand" replace />} />
          <Route path="docs" element={<Navigate to="/docs/zustand" replace />} />
          <Route path="docs/*" element={<DocumentationView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
