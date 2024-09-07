import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import MoodBalls from '../components/MoodBalls';
import MoodSelectionPage from '../components/MoodSelectionPage';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showMoodSelection, setShowMoodSelection] = useState(false);

  const handleCTAClick = () => {
    setShowMoodSelection(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <div className={`relative w-full h-screen flex flex-col items-center justify-center p-4 transition-transform duration-500 ${showMoodSelection ? 'translate-x-[-100%]' : ''}`}>
        <MoodBalls />
        <div className="container text-center max-w-2xl relative z-10">
          <h1 className="mooody-title text-5xl sm:text-6xl md:text-7xl font-bold mb-6">MOOODY</h1>
          <p className="text-xl sm:text-2xl mb-8">{t.subtitle}</p>
          <Button 
            className="bg-mooody-green hover:bg-mooody-dark-green text-white text-xl px-6 py-3 rounded-full transition-colors shadow-lg relative z-20"
            onClick={handleCTAClick}
          >
            {t.notificationButton}
          </Button>
        </div>
      </div>
      <MoodSelectionPage show={showMoodSelection} />
    </div>
  );
};

export default Index;