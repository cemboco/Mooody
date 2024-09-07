import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Home, Mic } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const SelectedMood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const selectedEmotions = location.state?.selectedEmotions || [];
  const [userInput, setUserInput] = useState('');

  const firstEmotion = selectedEmotions[0] || t.defaultMood;

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = language === 'de' ? 'de-DE' : 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(prevInput => prevInput + ' ' + transcript);
      };
      recognition.start();
    } else {
      alert(t.voiceInputNotSupported);
    }
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
        <h1 className="text-3xl font-bold mb-8">{t[firstEmotion] || firstEmotion}</h1>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t.whatsMakingYouFeel.replace('[emotion]', t[firstEmotion] || firstEmotion)}
        </h2>
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={t.typeHere}
          className="w-full h-64 text-lg p-4 bg-white bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-mooody-green"
        />
        <Button
          onClick={() => navigate('/mood')}
          className="mt-8"
        >
          {t.backToMoodSelection}
        </Button>
      </div>
      <Button
        onClick={handleVoiceInput}
        className="fixed bottom-4 left-4 z-[60] rounded-full bg-green-500 hover:bg-green-600"
        size="icon"
      >
        <Mic className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default SelectedMood;