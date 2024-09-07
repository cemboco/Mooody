import React from 'react';

const MoodBalls = () => {
  const moods = [
    "wütend", "selbstbewusst", "optimistisch", "taub", "müde",
    "glücklich", "traurig", "ängstlich", "ruhig", "besorgt"
  ];

  return (
    <div className="circles">
      {moods.map((mood, index) => (
        <div key={index} className={`ball ball${index + 1} text-gray-300 flex items-center justify-center text-sm`}>
          {mood}
        </div>
      ))}
      <div className="ball ball11 bg-white flex items-center justify-center text-gray-500 text-2xl">+</div>
    </div>
  );
};

export default MoodBalls;