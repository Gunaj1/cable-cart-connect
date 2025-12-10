import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { Toaster as AppToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ComparisonProvider } from "./contexts/ComparisonContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductDetailEnhanced from "./pages/ProductDetailEnhanced";
import TechnicalConsultation from "./pages/TechnicalConsultation";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/admin";
import ComparePage from "./pages/compare";
import BulkQuote from "./pages/BulkQuote";
import Workspace from "./pages/Workspace";
import Blogs from "./pages/Blogs";
import Advertisements from "./pages/Advertisements";
import AboutUs from "./pages/AboutUs";
import OurTeam from "./pages/OurTeam";
import OurJourney from "./pages/OurJourney";
import OurMission from "./pages/OurMission";
import OurVision from "./pages/OurVision";
import OurValues from "./pages/OurValues";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
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
                  <ProductDetailEnhanced />
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

            {/* About Pages */}
            <Route
              path="/about-us"
              element={
                <PrivateRoute>
                  <AboutUs />
                </PrivateRoute>
              }
            />
            <Route
              path="/team"
              element={
                <PrivateRoute>
                  <OurTeam />
                </PrivateRoute>
              }
            />
            <Route
              path="/journey"
              element={
                <PrivateRoute>
                  <OurJourney />
                </PrivateRoute>
              }
            />
            <Route
              path="/mission"
              element={
                <PrivateRoute>
                  <OurMission />
                </PrivateRoute>
              }
            />
            <Route
              path="/vision"
              element={
                <PrivateRoute>
                  <OurVision />
                </PrivateRoute>
              }
            />
            <Route
              path="/values"
              element={
                <PrivateRoute>
                  <OurValues />
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
  </HelmetProvider>
);

export default App;

