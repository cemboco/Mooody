import React, { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider"
import { Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const AudioPlayer = () => {
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => console.log('Audio autoplay was prevented:', error));
    }
  }, [volume]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center bg-white rounded-full shadow-md p-2 z-50">
      <Volume2 className="h-6 w-6 mr-2" />
      <Slider
        min={0}
        max={100}
        step={1}
        value={[volume]}
        onValueChange={handleVolumeChange}
        className="w-32"
        aria-label={t.volumeControl}
      />
      <audio ref={audioRef} src="/wind-sound.mp3" />
    </div>
  );
};

export default AudioPlayer;