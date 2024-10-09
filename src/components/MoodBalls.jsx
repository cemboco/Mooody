import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const MoodBalls = ({ showText = false, selectedEmotions = [], onEmotionSelect, onCustomEmotionClick, customEmotion }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const emotions = [
    "optimistic", "confident", "numb", "tired",
    "sad", "anxious", "calm", "worried"
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
        const ballClass = `ball ball${index + 1} flex items-center justify-center cursor-pointer transition-all duration-300 ${isSelected ? 'selected' : ''}`;
        return (
          <div 
            key={emotion} 
            className={ballClass}
            onClick={() => handleClick(emotion)}
          >
            {showText && (
              <span className={`text-sm ${isSelected ? 'text-white' : 'text-black'}`}>
                {t[emotion]}
              </span>
            )}
          </div>
        );
      })}
      <div 
        className="ball happy-ball flex items-center justify-center bg-white cursor-pointer border border-gray-200 shadow-sm"
        onClick={onCustomEmotionClick}
      >
        {showText && <span className="text-black text-2xl">{customEmotion || '+'}</span>}
      </div>
      <div 
        className={`ball floating-happy-ball flex items-center justify-center cursor-pointer ${selectedEmotions.includes('happy') ? 'selected' : ''}`}
        onClick={() => handleClick('happy')}
      >
        {showText && (
          <span className={`text-sm ${selectedEmotions.includes('happy') ? 'text-white' : 'text-black'}`}>
            {t.happy}
          </span>
        )}
      </div>
      <div 
        className={`ball floating-angry-ball flex items-center justify-center cursor-pointer ${selectedEmotions.includes('angry') ? 'selected' : ''}`}
        onClick={() => handleClick('angry')}
      >
        {showText && (
          <span className={`text-sm ${selectedEmotions.includes('angry') ? 'text-white' : 'text-black'}`}>
            {t.angry}
          </span>
        )}
      </div>
    </div>
  );
};

export default MoodBalls;