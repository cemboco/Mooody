import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const InitialMoodAssessment = ({ onAssessmentComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [moodValue, setMoodValue] = useState(5);

  const handleSliderChange = (value) => {
    setMoodValue(value[0]);
  };

  const handleSubmit = () => {
    onAssessmentComplete(moodValue);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.initialMoodQuestion}</h2>
      <div className="space-y-4">
        <Slider
          defaultValue={[5]}
          max={10}
          step={1}
          onValueChange={handleSliderChange}
        />
        <div className="flex justify-between text-sm">
          <span>{t.moodVeryBad}</span>
          <span>{t.moodExcellent}</span>
        </div>
        <p className="text-center">{t.yourMood}: {moodValue}</p>
      </div>
      <Button onClick={handleSubmit} className="w-full">{t.continue}</Button>
    </div>
  );
};

export default InitialMoodAssessment;