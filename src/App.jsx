import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import Mood from './pages/Mood';
import SelectedMood from './pages/SelectedMood';
import ConfirmationMood from './pages/ConfirmationMood';
import Calendar from './components/Calendar';
import GratitudeLog from './components/GratitudeLog';
import Index from './pages/Index';
import Meditate from './pages/Meditate';
import { useState, useEffect } from 'react';
import VolumeControl from './components/VolumeControl';
import { supabase } from './integrations/supabase/supabase';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';

const queryClient = new QueryClient();

const AppContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/padsound-meditation-21384.mp3'));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <BrowserRouter>
      <Header />
      <VolumeControl isPlaying={isPlaying} toggleAudio={toggleAudio} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        {navItems.map(({ to, page }) => (
          <Route key={to} path={to} element={page} />
        ))}
        <Route path="/mood" element={<Mood />} />
        <Route path="/selected-mood" element={<SelectedMood />} />
        <Route path="/confirmation-mood" element={<ConfirmationMood />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route path="/gratitude" element={<GratitudeLog />} />
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
            <Toaster />
            <AppContent />
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;