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
import TechnicalConsultation from "./pages/TechnicalConsultation";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/admin";
import ComparePage from "./pages/compare";
import BulkQuote from "./pages/BulkQuote";
import Workspace from "./pages/Workspace";
import Blogs from "./pages/Blogs";
import Advertisements from "./pages/Advertisements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ComparisonProvider>
      <TooltipProvider>
        <AppToaster />
        <SonnerToaster />
        <BrowserRouter>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Home Route */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            {/* Product Detail Page */}
            <Route
              path="/product/:productId"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />

            {/* Compare Page */}
            <Route
              path="/compare"
              element={
                <PrivateRoute>
                  <ComparePage />
                </PrivateRoute>
              }
            />

            {/* Technical Consultation Page */}
            <Route
              path="/technical-consultation"
              element={
                <PrivateRoute>
                  <TechnicalConsultation />
                </PrivateRoute>
              }
            />

            {/* Bulk Quote Page */}
            <Route
              path="/bulk-quote"
              element={
                <PrivateRoute>
                  <BulkQuote />
                </PrivateRoute>
              }
            />

            {/* Workspace Page */}
            <Route
              path="/workspace"
              element={
                <PrivateRoute>
                  <Workspace />
                </PrivateRoute>
              }
            />

            {/* Blogs Page */}
            <Route
              path="/blogs"
              element={
                <PrivateRoute>
                  <Blogs />
                </PrivateRoute>
              }
            />

            {/* Advertisements Page */}
            <Route
              path="/advertisements"
              element={
                <PrivateRoute>
                  <Advertisements />
                </PrivateRoute>
              }
            />

            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ComparisonProvider>
  </QueryClientProvider>
);

export default App;

