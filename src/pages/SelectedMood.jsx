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

  // Get the first selected mood for the title
  const firstMood = selectedEmotions[0] ? (t[selectedEmotions[0]] || selectedEmotions[0]) : t.defaultMoodTitle;

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="w-full max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">{firstMood}</h1>
        <h2 className="text-2xl mb-6 text-center">{t.selectedMoods}</h2>
        <ul className="list-disc list-inside">
          {selectedEmotions.map((emotion, index) => (
            <li key={index} className="text-xl mb-2">{t[emotion] || emotion}</li>
          ))}
        </ul>
        <Button
          onClick={() => navigate('/mood')}
          className="mt-8 mx-auto block"
        >
          {t.backToMoodSelection}
        </Button>
      </div>
    </div>
  );
};

export default SelectedMood;