import React from 'react';

const MoodBalls = ({ showText = false, textColor = 'text-gray-300' }) => {
  const emotions = [
    "angry", "confident", "optimistic", "numb", "tired",
    "happy", "sad", "anxious", "calm", "worried"
  ];

  return (
    <div className="circles">
      {emotions.map((emotion, index) => (
        <div key={emotion} className={`ball ball${index + 1} flex items-center justify-center`}>
          {showText && <span className={`${textColor} text-sm`}>{emotion}</span>}
        </div>
      ))}
      <div className="ball ball11 flex items-center justify-center bg-white">
        {showText && <span className={`${textColor} text-2xl`}>+</span>}
      </div>
    </div>
  );
};

export default MoodBalls;