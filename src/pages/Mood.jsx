import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import EmotionSelector from '../components/EmotionSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Mood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const handleEmotionSelect = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleCustomEmotionAdd = (customEmotion) => {
    if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, customEmotion]);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="w-full max-w-md px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">{t.selectUpToThreeMoods}</h2>
        <EmotionSelector
          selectedEmotions={selectedEmotions}
          onEmotionSelect={handleEmotionSelect}
          onCustomEmotionAdd={handleCustomEmotionAdd}
        />
      </div>
    </div>
  );
};

export default Mood;