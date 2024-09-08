import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home, Play, Square } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const Meditate = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [isMeditating, setIsMeditating] = useState(false);

  const handleBackToMood = () => {
    navigate(-1);
  };

  const handleStartMeditation = () => {
    setIsMeditating(true);
    // Add meditation start logic here
  };

  const handleStopMeditation = () => {
    setIsMeditating(false);
    // Add meditation stop logic here
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
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={handleStartMeditation}
            disabled={isMeditating}
            className="bg-mooody-green hover:bg-mooody-dark-green text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            {t.startMeditation || 'Start'}
          </Button>
          <Button
            onClick={handleStopMeditation}
            disabled={!isMeditating}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Square className="h-4 w-4 mr-2" />
            {t.stopMeditation || 'Stop'}
          </Button>
        </div>
        {isMeditating && (
          <p className="text-lg mb-8">{t.meditationInProgress || 'Meditation in progress...'}</p>
        )}
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