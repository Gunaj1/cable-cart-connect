import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { Toaster as AppToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ComparisonProvider } from "./contexts/ComparisonContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetailEnhanced from "./pages/ProductDetailEnhanced";
import TechnicalConsultation from "./pages/TechnicalConsultation";
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
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ComparisonProvider>
        <TooltipProvider>
          <AppToaster />
          <SonnerToaster />
          <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/product/:productId" element={<ProductDetailEnhanced />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/technical-consultation" element={<TechnicalConsultation />} />
            <Route path="/bulk-quote" element={<BulkQuote />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/advertisements" element={<Advertisements />} />
            <Route path="/press-releases" element={<PressReleases />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/journey" element={<OurJourney />} />
            <Route path="/mission" element={<OurMission />} />
            <Route path="/vision" element={<OurVision />} />
            <Route path="/values" element={<OurValues />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/distributors" element={<Distributors />} />
            <Route path="/supplier-inquiries" element={<SupplierInquiries />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ComparisonProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;

