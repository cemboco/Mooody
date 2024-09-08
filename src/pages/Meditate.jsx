import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [volume, setVolume] = useState(0.5);
  const [selectedAudio, setSelectedAudio] = useState('/wandering-6394.mp3');
  const audioRef = useRef(null);

  const audioOptions = [
    { value: '/birds-in-forest-on-sunny-day-14444.mp3', label: 'Birds' },
    { value: '/lluvia-rain-110426.mp3', label: 'Rain' },
    { value: '/wandering-6394.mp3', label: 'Wander' },
    { value: '/waves-53479.mp3', label: 'Waves' },
    { value: '/wind-artificial-18750.mp3', label: 'Wind' },
  ];

  useEffect(() => {
    let timer;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsMeditating(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    return () => clearInterval(timer);
  }, [isMeditating, timeLeft]);

  const handleBackToMood = () => {
    navigate(-1);
  };

  const handleStartMeditation = () => {
    setIsMeditating(true);
    setTimeLeft(duration);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleStopMeditation = () => {
    setIsMeditating(false);
    setTimeLeft(duration);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleAudioChange = (value) => {
    setSelectedAudio(value);
    if (audioRef.current) {
      audioRef.current.src = value;
      if (isMeditating) {
        audioRef.current.play();
      }
    }
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
        <div className="mb-4">
          <Select onValueChange={handleAudioChange} defaultValue={selectedAudio}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select audio" />
            </SelectTrigger>
            <SelectContent>
              {audioOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
        <div className="flex items-center space-x-2 mb-8">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-32"
          />
        </div>
        <Button
          onClick={handleBackToMood}
          className="mt-8"
        >
          {t.backToMood}
        </Button>
      </div>
      <audio ref={audioRef} src={selectedAudio} loop />
    </div>
  );
};

export default Meditate;