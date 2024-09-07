import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const EmotionBalls = ({ selectedEmotions, onEmotionClick, onCustomEmotionClick }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const emotions = [
    "happy", "sad", "excited", "angry", "calm", "anxious",
    "tired", "energetic", "confused", "confident"
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
            selectedEmotions.includes(emotion)
              ? 'bg-mooody-green text-white scale-110'
              : 'bg-white text-mooody-green'
          }`}
          onClick={() => onEmotionClick(emotion)}
        >
          <span className={`text-sm ${selectedEmotions.includes(emotion) ? 'font-bold' : ''}`}>
            {t[emotion] || emotion}
          </span>
        </button>
      ))}
      <button
        className="w-24 h-24 rounded-full bg-white border-2 border-mooody-green text-mooody-green flex items-center justify-center"
        onClick={onCustomEmotionClick}
      >
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
};

export default EmotionBalls;