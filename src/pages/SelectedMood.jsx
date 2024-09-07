import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const [inputText, setInputText] = useState('');

  const primaryEmotion = selectedEmotions[0] || '';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green overflow-hidden p-4">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <h1 className="text-4xl font-bold mt-16 mb-8">{t[primaryEmotion] || primaryEmotion}</h1>
      <h2 className="text-2xl text-center mb-4">
        {t.whatsMakingYouFeel.replace('[emotion]', t[primaryEmotion] || primaryEmotion)}
      </h2>
      <p className="text-lg mb-8">{t.tapAnywhereToType}</p>
      <Textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={t.typeYourThoughtsHere}
        className="w-full max-w-2xl h-64 p-4 text-lg"
      />
      <div className="mt-8">
        <h3 className="text-xl mb-4">{t.allSelectedMoods}</h3>
        <ul className="list-disc list-inside">
          {selectedEmotions.map((emotion, index) => (
            <li key={index} className="text-lg mb-2">{t[emotion] || emotion}</li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => navigate('/mood')}
        className="mt-8"
      >
        {t.backToMoodSelection}
      </Button>
    </div>
  );
};

export default SelectedMood;