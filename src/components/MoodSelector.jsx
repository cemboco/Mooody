import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialMoods = [
  { emoji: "😊", label: "Glücklich" },
  { emoji: "😢", label: "Traurig" },
  { emoji: "😴", label: "Müde" },
  { emoji: "😠", label: "Wütend" },
  { emoji: "😰", label: "Gestresst" },
  { emoji: "😨", label: "Ängstlich" },
];

const MoodSelector = ({ onMoodSelect }) => {
  const [moods, setMoods] = useState(initialMoods);
  const [selectedMood, setSelectedMood] = useState(null);
  const [customMood, setCustomMood] = useState('');

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood);
    }
  };

  const handleAddCustomMood = () => {
    if (customMood.trim() !== '') {
      const newMood = { emoji: "🆕", label: customMood.trim() };
      setMoods([...moods, newMood]);
      setCustomMood('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wähle deine Stimmung</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <Button
            key={mood.label}
            onClick={() => handleMoodClick(mood)}
            className={`text-2xl p-4 ${selectedMood === mood ? 'ring-2 ring-blue-500' : ''}`}
          >
            {mood.emoji}
          </Button>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          placeholder="Eigene Stimmung eingeben"
        />
        <Button onClick={handleAddCustomMood}>Hinzufügen</Button>
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
