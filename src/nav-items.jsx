import React from 'react';
import Mood from './pages/Mood';
import SelectedMood from './pages/SelectedMood';
import ConfirmationMood from './pages/ConfirmationMood';
import Calendar from './components/Calendar';
import GratitudeLog from './components/GratitudeLog';

export const navItems = [
  { to: '/mood', page: <Mood /> },
  { to: '/selected-mood', page: <SelectedMood /> },
  { to: '/confirmation-mood', page: <ConfirmationMood /> },
  { to: '/calendar', page: <Calendar /> },
  { to: '/gratitude', page: <GratitudeLog /> },
];