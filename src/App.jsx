import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Mood from './pages/Mood';
import SelectedMood from './pages/SelectedMood';
import ConfirmationMood from './pages/ConfirmationMood';
import Calendar from './components/Calendar';
import Index from './pages/Index';
import Meditate from './pages/Meditate';
import Login from './pages/Login';
import VolumeControl from './components/VolumeControl';
import HomeButton from './components/HomeButton';
import { createClient } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const supabaseUrl = 'https://mypxifpqgzyhhecibskk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15cHhpZnBxZ3p5aGhlY2lic2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTM4ODYsImV4cCI6MjA0MTM4OTg4Nn0.6h8ABP7_V4FAap0RJOC9-QxyqDtRgwDYblmkDtLef4c';
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const loginWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging in with Google:', error.message);
    return null;
  }
};

const AppContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/padsound-meditation-21384.mp3'));
  const { login } = useAuth();

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
      <VolumeControl isPlaying={isPlaying} toggleAudio={toggleAudio} />
      <HomeButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/selected-mood" element={<SelectedMood />} />
        <Route path="/confirmation-mood" element={
          <ProtectedRoute>
            <ConfirmationMood />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/meditate" element={<Meditate />} />
      </Routes>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;