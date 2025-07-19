import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import TestSelectionDashboard from "pages/test-selection-dashboard";
import ResultsDashboard from "pages/results-dashboard";
import MockTestInterface from "pages/mock-test-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<TestSelectionDashboard />} />
         {/* <Route path="/test-selection-dashboard" element={<TestSelectionDashboard />} /> */}
        <Route path="/results-dashboard" element={<ResultsDashboard />} /> 
        <Route path="/mock-test-interface" element={<MockTestInterface />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;