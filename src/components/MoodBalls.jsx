import React from 'react';

const MoodBalls = ({ showText = false, textColor = 'text-gray-300', selectedEmotions = [], onEmotionSelect, onCustomEmotionClick }) => {
  const emotions = [
    "angry", "confident", "optimistic", "numb", "tired",
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
              <span className={`${isSelected ? 'text-white font-bold' : textColor} text-sm`}>
                {emotion}
              </span>
            )}
          </div>
        );
      })}
      <div 
        className="ball ball11 flex items-center justify-center bg-white cursor-pointer"
        onClick={onCustomEmotionClick}
      >
        {showText && <span className={`${textColor} text-2xl`}>+</span>}
      </div>
    </div>
  );
};

export default MoodBalls;