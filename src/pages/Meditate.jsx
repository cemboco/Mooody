import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [duration, setDuration] = useState(300); // Default to 5 minutes (300 seconds)
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let timer;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsMeditating(false);
    }
    return () => clearInterval(timer);
  }, [isMeditating, timeLeft]);

  const handleBackToMood = () => {
    navigate(-1);
  };

  const handleStartMeditation = () => {
    setIsMeditating(true);
    setTimeLeft(duration);
  };

  const handleStopMeditation = () => {
    setIsMeditating(false);
    setTimeLeft(duration);
  };

  const handleDurationChange = (value) => {
    const newDuration = parseInt(value, 10);
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full flex bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/home')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      
      {/* Left side content */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center">
        <p className="text-lg leading-relaxed mb-4">
          {t.meditationLeftSideText}
        </p>
        <p className="text-lg leading-relaxed italic">
          "{t.meditationQuote}"
          <br />
          — Rumi
        </p>
      </div>

      {/* Right side with meditation controls */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-6">{t.meditateTitle}</h1>
        <p className="text-xl mb-8">{t.meditateDescription}</p>
        <div className="mb-4">
          <Select onValueChange={handleDurationChange} defaultValue="300">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">5 {t.minutes}</SelectItem>
              <SelectItem value="600">10 {t.minutes}</SelectItem>
              <SelectItem value="1200">20 {t.minutes}</SelectItem>
              <SelectItem value="1800">30 {t.minutes}</SelectItem>
              <SelectItem value="2700">45 {t.minutes}</SelectItem>
              <SelectItem value="3600">60 {t.minutes}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-4xl font-bold mb-8">{formatTime(timeLeft)}</div>
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={handleStartMeditation}
            disabled={isMeditating}
            className="bg-mooody-green hover:bg-mooody-dark-green text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            {t.startMeditation}
          </Button>
          <Button
            onClick={handleStopMeditation}
            disabled={!isMeditating}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Square className="h-4 w-4 mr-2" />
            {t.stopMeditation}
          </Button>
        </div>
        {isMeditating && (
          <p className="text-lg mb-8">{t.meditationInProgress}</p>
        )}
        <Button
          onClick={handleBackToMood}
          className="mt-8"
        >
          {t.backToMood}
        </Button>
      </div>
    </div>
  );
};

export default Meditate;