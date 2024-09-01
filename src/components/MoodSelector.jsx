import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

const moods = [
  { emoji: "😊", label: "Glücklich" },
  { emoji: "😢", label: "Traurig" },
  { emoji: "😴", label: "Müde" },
  { emoji: "😠", label: "Wütend" },
  { emoji: "😰", label: "Gestresst" },
  { emoji: "😨", label: "Ängstlich" },
];

const MoodSelector = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wähle deine Stimmung</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <Button
            key={mood.emoji}
            onClick={() => handleMoodClick(mood)}
            className={`text-2xl p-4 ${selectedMood === mood ? 'ring-2 ring-blue-500' : ''}`}
          >
            {mood.emoji}
          </Button>
        ))}
      </div>
      {selectedMood && (
        <div className="space-y-4 mt-6">
          <p className="text-lg">Du fühlst dich {selectedMood.label}</p>
          <Button onClick={handleSubmit} className="w-full">Bestätigen</Button>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
