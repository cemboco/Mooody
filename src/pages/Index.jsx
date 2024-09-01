import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import { selectGame } from '../utils/gameSelector';
import { Button } from "@/components/ui/button"

const Index = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedGame, setSuggestedGame] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const game = selectGame(mood.label);
    setSuggestedGame(game);
  };

  const handlePlayAgain = () => {
    setSelectedMood(null);
    setSuggestedGame(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
        {!selectedMood ? (
          <>
            <p className="text-xl text-gray-600 mb-6">Wie fühlst du dich gerade?</p>
            <MoodSelector onMoodSelect={handleMoodSelect} />
          </>
        ) : (
          <>
            <p className="text-2xl mb-4">Du fühlst dich: {selectedMood.emoji} {selectedMood.label}</p>
            {suggestedGame && (
              <div className="mt-6">
                <p className="text-xl mb-2">Hier ist ein Spiel, das dir helfen könnte:</p>
                <p className="text-3xl font-bold mb-6">{suggestedGame.name}</p>
                <Button onClick={handlePlayAgain} className="mt-4">
                  Nochmal spielen
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
