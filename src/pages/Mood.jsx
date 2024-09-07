import React from 'react';
import MoodBalls from '../components/MoodBalls';

const Mood = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <MoodBalls />
      <h1 className="text-4xl font-bold z-10 relative">Select Your Mood</h1>
    </div>
  );
};

export default Mood;