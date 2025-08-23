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
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ComparisonProvider>
      <TooltipProvider>
        <AppToaster />
        <SonnerToaster />
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <ErrorBoundary>
                      <Index />
                    </ErrorBoundary>
                  </PrivateRoute>
                }
              />
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
