import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const CheckIn = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const navigationTimer = setTimeout(() => {
      navigate('/home');
    }, 5000); // Navigate after 5 seconds

    return () => clearTimeout(navigationTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <div className="text-center">
        <h1 className={`check-in-title mb-4 ${titleVisible ? 'fade-in' : ''}`}>
          {t.checkInTitle}
        </h1>
        <p className="check-in-subtitle mb-8">
          {t.checkInSubtitle}
        </p>
        <Button
          onClick={() => navigate('/home')}
          className="bg-mooody-green hover:bg-mooody-dark-green text-white text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors shadow-lg"
        >
          {t.getStarted}
        </Button>
      </div>
    </div>
  );
};

export default CheckIn;