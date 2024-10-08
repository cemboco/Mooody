import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from 'react-router-dom';
import { Play, Square, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Meditate = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [isMeditating, setIsMeditating] = useState(false);
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [volume, setVolume] = useState(0.5);
  const [selectedAudio, setSelectedAudio] = useState('/wandering.mp3');
  const audioRef = useRef(null);
  const bellAudioRef = useRef(null);

  const audioOptions = [
    { value: '/birds-in-forest-on-sunny-day-14444.mp3', label: 'Birds' },
    { value: '/wandering.mp3', label: 'Wander' },
    { value: '/waves-53479.mp3', label: 'Waves' },
    { value: '/wind-artificial-18750.mp3', label: 'Wind' },
  ];

  useEffect(() => {
    let timer;
    if (isMeditating && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      setIsMeditating(false);
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
      bellAudioRef.current?.play();
    }
    return () => clearInterval(timer);
  }, [isMeditating, timeLeft]);

  const handleStartStop = () => {
    if (isMeditating) {
      setIsMeditating(false);
      audioRef.current?.pause();
    } else {
      setIsMeditating(true);
      setTimeLeft(duration);
      audioRef.current?.play();
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
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleAudioChange = (value) => {
    setSelectedAudio(value);
    if (audioRef.current) {
      audioRef.current.src = value;
      audioRef.current.loop = true;
      if (isMeditating) audioRef.current.play();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const meditationText = {
    en: "Meditation is a powerful practice for cultivating emotional awareness and mindfulness. By regularly meditating, individuals can develop a deeper understanding of their feelings, learn to observe them without judgment, and manage them more effectively. Here are some reasons why meditation is especially beneficial for becoming more aware of one's emotions",
    de: "Meditation ist eine kraftvolle Praxis zur Förderung emotionaler Bewusstheit und Achtsamkeit. Durch regelmäßiges Meditieren können Individuen ein tieferes Verständnis ihrer Gefühle entwickeln, lernen, sie ohne Urteil zu beobachten und sie effektiver zu handhaben. Hier sind einige Gründe, warum Meditation besonders vorteilhaft ist, um sich seiner Emotionen bewusster zu werden"
  };

  return (
    <div className="min-h-screen w-full flex bg-mooody-yellow text-mooody-green overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md">
          <p className="text-lg leading-relaxed mb-4">
            {meditationText[language]}
          </p>
          <p className="text-lg leading-relaxed italic">"{t.meditationQuote}"<br />— Rumi</p>
        </div>
      </div>

      <Separator orientation="vertical" className="h-[80vh] self-center bg-blue-900" />

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-6">{t.meditateTitle}</h1>
        <p className="text-xl mb-8">{t.meditateDescription}</p>
        <Select onValueChange={handleDurationChange} defaultValue="300">
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {[1, 5, 10, 20, 30, 45, 60].map(min => (
              <SelectItem key={min} value={String(min * 60)}>{min} {t.minutes}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleAudioChange} defaultValue={selectedAudio}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select audio" />
          </SelectTrigger>
          <SelectContent>
            {audioOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-4xl font-bold mb-8">{formatTime(timeLeft)}</div>
        <Button
          onClick={handleStartStop}
          className={`mb-8 ${isMeditating ? 'bg-red-500 hover:bg-red-600' : 'bg-mooody-green hover:bg-mooody-dark-green'} text-white`}
        >
          {isMeditating ? <><Square className="h-4 w-4 mr-2" />{t.stopMeditation}</> : <><Play className="h-4 w-4 mr-2" />{t.startMeditation}</>}
        </Button>
        <div className="flex items-center space-x-2 mb-8">
          <Volume2 className="h-4 w-4" />
          <Slider value={[volume]} onValueChange={handleVolumeChange} max={1} step={0.01} className="w-32" />
        </div>
        <Button onClick={() => navigate(-1)}>{t.backToMood}</Button>
      </div>
      <audio ref={audioRef} src={selectedAudio} loop />
      <audio ref={bellAudioRef} src="/bell-222490.mp3" />
    </div>
  );
};

export default Meditate;