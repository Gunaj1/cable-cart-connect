// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster as AppToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ComparisonProvider } from "./contexts/ComparisonContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/admin";
import ComparePage from "./pages/compare";

/* Added: Local ErrorBoundary to safely catch render/effect errors without changing page content */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: 16 }}>
          <p>Something went wrong.</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.message ?? "Unknown error"}</pre>
          <button onClick={() => this.setState({ hasError: false, error: undefined })}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ComparisonProvider>
      <TooltipProvider>
        <AppToaster />
        <SonnerToaster />
        {/* Wrap entire router to avoid app-wide crash on route/component errors */}
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Home Route */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    {/* Local boundary around main page */}
                    <ErrorBoundary>
                      <Index />
                    </ErrorBoundary>
                  </PrivateRoute>
                }
              />

              {/* Admin Route */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <ErrorBoundary>
                      <Admin />
                    </ErrorBoundary>
                  </AdminRoute>
                }
              />

              {/* Product Detail Page */}
              <Route
                path="/product/:productId"
                element={
                  <PrivateRoute>
                    <ErrorBoundary>
                      <ProductDetail />
                    </ErrorBoundary>
                  </PrivateRoute>
                }
              />

              {/* Compare Page */}
              <Route
                path="/compare"
                element={
                  <PrivateRoute>
                    <ErrorBoundary>
                      <ComparePage />
                    </ErrorBoundary>
                  </PrivateRoute>
                }
              />

              {/* Catch-all Not Found Route */}
              <Route
                path="*"
                element={
                  <ErrorBoundary>
                    <NotFound />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </ComparisonProvider>
  </QueryClientProvider>
);

export default App;
