import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from 'react-router-dom';
import { Home, Play, Square, Volume2 } from 'lucide-react';
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
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleStopMeditation();
    }
    return () => clearInterval(timer);
  }, [isMeditating, timeLeft]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleBackToMood = () => {
    navigate(-1);
  };

  const handleStartMeditation = () => {
    setIsMeditating(true);
    setTimeLeft(duration);
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
      console.log('Attempting to play audio');
    } else {
      console.error('Audio element not found');
    }
  };

  const handleStopMeditation = () => {
    setIsMeditating(false);
    setTimeLeft(duration);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log('Audio stopped');
    }
  };

  const handleDurationChange = (value) => {
    const newDuration = parseInt(value, 10);
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    console.log('Volume changed to:', newVolume);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-32"
          />
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
      <audio ref={audioRef} loop>
        <source src="/zen-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Meditate;