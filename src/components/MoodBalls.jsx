import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const MoodBalls = ({ showText = false, selectedEmotions = [], onEmotionSelect, onCustomEmotionClick }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const emotions = [
    "angry", "confident", "angry", "numb", "tired",
    "happy", "sad", "anxious", "calm", "worried"
  ];

  const handleClick = (emotion) => {
    if (onEmotionSelect) {
      onEmotionSelect(emotion);
    }
  };

  return (
    <div className="circles">
      {emotions.map((emotion, index) => {
        const isSelected = selectedEmotions.includes(emotion);
        return (
          <div 
            key={emotion} 
            className={`ball ball${index + 1} flex items-center justify-center cursor-pointer transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}
            onClick={() => handleClick(emotion)}
          >
            {showText && (
              <span className={`text-sm ${isSelected ? 'text-white font-bold' : 'text-black'}`}>
                {t[emotion]}
              </span>
            )}
          </div>
        );
      })}
      <div 
        className="ball ball11 flex items-center justify-center bg-white cursor-pointer"
        onClick={onCustomEmotionClick}
      >
        {showText && <span className="text-black text-2xl">+</span>}
      </div>
    </div>
  );
};

export default MoodBalls;