import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { LanguageProvider } from './contexts/LanguageContext';
import { SupabaseAuthProvider } from './integrations/supabase';
import Mood from './pages/Mood';
import SelectedMood from './pages/SelectedMood';
import ConfirmationMood from './pages/ConfirmationMood';
import Calendar from './components/Calendar';
import Index from './pages/Index';
import Meditate from './pages/Meditate';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SupabaseAuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
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
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SupabaseAuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;