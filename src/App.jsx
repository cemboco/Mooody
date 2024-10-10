import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import Mood from './pages/Mood';
import SelectedMood from './pages/SelectedMood';
import MoodProfile from './pages/MoodProfile';
import Calendar from './components/Calendar';
import GratitudeLog from './components/GratitudeLog';
import Index from './pages/Index';
import Meditate from './pages/Meditate';
import Breathing from './pages/Breathing';
import { LanguageProvider } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import Header from './components/Header';

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        {navItems.map(({ to, page }) => (
          <Route key={to} path={to} element={page} />
        ))}
        <Route path="/mood" element={<Mood />} />
        <Route path="/selected-mood" element={<SelectedMood />} />
        <Route path="/mood-profile" element={<MoodProfile />} />
        <Route path="/confirmation-mood" element={<MoodProfile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/gratitude" element={<GratitudeLog />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <AudioProvider>
              <Toaster />
              <AppContent />
            </AudioProvider>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;