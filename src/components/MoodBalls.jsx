import React from 'react';
import { Plus } from 'lucide-react';

const MoodBalls = ({ showText = false, textColor = 'text-gray-300', selectedEmotions, onEmotionClick, onCustomEmotionClick }) => {
  const emotions = [
    "angry", "confident", "optimistic", "numb", "tired",
    "happy", "sad", "anxious", "calm", "worried"
  ];

  return (
    <div className="circles relative w-full h-64">
      {emotions.map((emotion, index) => (
        <div 
          key={emotion} 
          className={`ball ball${index + 1} flex items-center justify-center cursor-pointer transition-all ${
            selectedEmotions.includes(emotion) ? 'scale-110' : ''
          }`}
          onClick={() => onEmotionClick(emotion)}
        >
          {showText && (
            <span className={`${textColor} ${
              selectedEmotions.includes(emotion) ? 'text-lg font-bold' : 'text-sm'
            }`}>
              {emotion}
            </span>
          )}
        </div>
      ))}
      <div 
        className="ball ball11 flex items-center justify-center bg-white cursor-pointer"
        onClick={onCustomEmotionClick}
      >
        {showText && <Plus className={`${textColor} text-2xl`} />}
      </div>
    </div>
  );
};

export default MoodBalls;