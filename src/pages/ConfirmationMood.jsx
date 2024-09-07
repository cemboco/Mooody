import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const ConfirmationMood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const { date, emotion, text } = location.state || {};

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', options);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="relative w-full h-screen flex flex-col items-center justify-start p-4 pt-16">
        <h1 className="text-3xl font-bold mb-8">{t.entries}</h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{formatDate(date)}</h2>
          <h3 className="text-xl font-semibold mb-2">{t.moodCheck}</h3>
          <p className="text-lg mb-4">{t[emotion] || emotion}</p>
          <p className="text-base">{text}</p>
        </div>
        <Button
          onClick={() => navigate('/')}
          className="mt-8"
        >
          {t.backToHome}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationMood;