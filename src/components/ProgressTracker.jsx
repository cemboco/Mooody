import React from 'react';
import { Progress } from "@/components/ui/progress"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const ProgressTracker = ({ moodData }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const calculateProgress = () => {
    if (moodData.length < 2) return 0;
    const improvement = moodData[moodData.length - 1] - moodData[0];
    return Math.min(Math.max(improvement * 10, 0), 100);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{t.progressTitle}</h3>
      <Progress value={calculateProgress()} className="w-full" />
      <p className="text-sm text-gray-600">{t.progressDescription}</p>
    </div>
  );
};

export default ProgressTracker;