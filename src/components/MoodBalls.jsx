import React from 'react';

const MoodBalls = () => {
  const emotions = [
    "angry", "confident", "optimistic", "numb", "tired",
    "happy", "sad", "anxious", "calm", "worried"
  ];

  return (
    <div className="circles">
      {emotions.map((emotion, index) => (
        <div key={emotion} className={`ball ball${index + 1} flex items-center justify-center`}>
          <span className="text-gray-300 text-sm">{emotion}</span>
        </div>
      ))}
      <div className="ball ball11 flex items-center justify-center bg-white">
        <span className="text-gray-500 text-2xl">+</span>
      </div>
    </div>
  );
};

export default MoodBalls;