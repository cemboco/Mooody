import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const Meditate = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const handleBackToMood = () => {
    navigate(-1); // This will navigate back to the previous page (SelectedMood)
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/home')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">{t.meditateTitle || 'Meditate'}</h1>
        <p className="text-xl mb-8">{t.meditateDescription || 'Take a moment to breathe and relax.'}</p>
        {/* Add meditation content or components here */}
      </div>
      <Button
        onClick={handleBackToMood}
        className="mt-8"
      >
        {t.backToMood || 'Back to Mood'}
      </Button>
    </div>
  );
};

export default Meditate;