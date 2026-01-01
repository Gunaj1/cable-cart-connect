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
import Culture from "./pages/Culture";
import Careers from "./pages/Careers";
import Blogs from "./pages/Blogs";
import Advertisements from "./pages/Advertisements";
import PressReleases from "./pages/PressReleases";
import AboutUs from "./pages/AboutUs";
import OurTeam from "./pages/OurTeam";
import OurJourney from "./pages/OurJourney";
import OurMission from "./pages/OurMission";
import OurVision from "./pages/OurVision";
import OurValues from "./pages/OurValues";
import Partnerships from "./pages/Partnerships";
import Distributors from "./pages/Distributors";
import SupplierInquiries from "./pages/SupplierInquiries";

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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/product/:productId" element={<PrivateRoute><ProductDetailEnhanced /></PrivateRoute>} />
            <Route path="/compare" element={<PrivateRoute><ComparePage /></PrivateRoute>} />
            <Route path="/technical-consultation" element={<PrivateRoute><TechnicalConsultation /></PrivateRoute>} />
            <Route path="/bulk-quote" element={<PrivateRoute><BulkQuote /></PrivateRoute>} />
            <Route path="/workspace" element={<PrivateRoute><Workspace /></PrivateRoute>} />
            <Route path="/culture" element={<PrivateRoute><Culture /></PrivateRoute>} />
            <Route path="/careers" element={<PrivateRoute><Careers /></PrivateRoute>} />
            <Route path="/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
            <Route path="/advertisements" element={<PrivateRoute><Advertisements /></PrivateRoute>} />
            <Route path="/press-releases" element={<PrivateRoute><PressReleases /></PrivateRoute>} />
            <Route path="/about-us" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
            <Route path="/team" element={<PrivateRoute><OurTeam /></PrivateRoute>} />
            <Route path="/journey" element={<PrivateRoute><OurJourney /></PrivateRoute>} />
            <Route path="/mission" element={<PrivateRoute><OurMission /></PrivateRoute>} />
            <Route path="/vision" element={<PrivateRoute><OurVision /></PrivateRoute>} />
            <Route path="/values" element={<PrivateRoute><OurValues /></PrivateRoute>} />
            <Route path="/partnerships" element={<PrivateRoute><Partnerships /></PrivateRoute>} />
            <Route path="/distributors" element={<PrivateRoute><Distributors /></PrivateRoute>} />
            <Route path="/supplier-inquiries" element={<PrivateRoute><SupplierInquiries /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ComparisonProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;

