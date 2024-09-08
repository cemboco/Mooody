import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from 'react-router-dom';
import { Home, Play, Pause, Square, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const Meditate = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [isMeditating, setIsMeditating] = useState(false);
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/meditation.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsMeditating(false);
      handleStopSound();
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
    handlePlaySound();
  };

  const handleStopMeditation = () => {
    setIsMeditating(false);
    setTimeLeft(duration);
    handleStopSound();
  };

  const handleDurationChange = (value) => {
    const newDuration = parseInt(value, 10);
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const handlePlaySound = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePauseSound = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleStopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleVolumeChange = (value) => {
    setVolume(value[0]);
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

      {/* Vertical Divider */}
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-[10cm] bg-blue-900" />
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
        <div className="flex flex-col items-center space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">Wandering Sound</h2>
          <div className="flex space-x-2">
            <Button onClick={handlePlaySound} disabled={isPlaying}>
              Play Sound
            </Button>
            <Button onClick={handlePauseSound} disabled={!isPlaying}>
              Pause Sound
            </Button>
            <Button onClick={handleStopSound}>
              Stop Sound
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              className="w-32"
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
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