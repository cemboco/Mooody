import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const MindfulnessExercise = ({ onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t.mindfulnessTitle}</h3>
      <p>{t.mindfulnessInstruction}</p>
      <div className="text-3xl font-bold text-center">{timeLeft}s</div>
      <Button onClick={toggleTimer} className="w-full">
        {isActive ? t.pauseMindfulness : t.startMindfulness}
      </Button>
    </div>
  );
};

export default MindfulnessExercise;