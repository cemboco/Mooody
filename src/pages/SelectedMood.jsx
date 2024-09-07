import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const SelectedMood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const selectedEmotions = location.state?.selectedEmotions || [];

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
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl mb-6 z-10">{t.selectedMoods}</h2>
        <ul className="list-disc list-inside">
          {selectedEmotions.map((emotion, index) => (
            <li key={index} className="text-xl mb-2">{t[emotion] || emotion}</li>
          ))}
        </ul>
        <Button
          onClick={() => navigate('/mood')}
          className="mt-8"
        >
          {t.backToMoodSelection}
        </Button>
      </div>
    </div>
  );
};

export default SelectedMood;