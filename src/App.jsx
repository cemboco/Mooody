import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { LanguageProvider } from './contexts/LanguageContext';
import Mood from './pages/Mood';
import SelectedMood from './pages/SelectedMood';
import ConfirmationMood from './pages/ConfirmationMood';
import Calendar from './components/Calendar';
import CheckIn from './pages/CheckIn';
import ExploreReason from './pages/ExploreReason';
import Index from './pages/Index';
import React from 'react';

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CheckIn />} />
              <Route path="/explore-reason" element={<ExploreReason />} />
              <Route path="/home" element={<Index />} />
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              <Route path="/mood" element={<Mood />} />
              <Route path="/selected-mood" element={<SelectedMood />} />
              <Route path="/confirmation-mood" element={<ConfirmationMood />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;