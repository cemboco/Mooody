import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const moods = [
  { emoji: "😊", label: "Glücklich" },
  { emoji: "😢", label: "Traurig" },
  { emoji: "😴", label: "Müde" },
  { emoji: "😠", label: "Wütend" },
  { emoji: "😰", label: "Gestresst" },
];

const MoodSelector = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(5);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleIntensityChange = (value) => {
    setIntensity(value[0]);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, intensity);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg mb-4">Wie fühlst du dich gerade?</p>
      <div className="space-y-4 mb-6">
        <Slider
          defaultValue={[5]}
          max={10}
          step={1}
          onValueChange={handleIntensityChange}
        />
        <p className="text-center">Intensität: {intensity}</p>
      </div>
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
          <p className="text-lg">Du fühlst dich {selectedMood.label} mit einer Intensität von {intensity}</p>
          <Button onClick={handleSubmit} className="w-full">Bestätigen</Button>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
