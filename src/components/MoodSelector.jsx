import React from 'react';
import { Button } from "@/components/ui/button"

const moods = [
  { emoji: "😊", label: "Glücklich" },
  { emoji: "😢", label: "Traurig" },
  { emoji: "😴", label: "Müde" },
  { emoji: "😠", label: "Wütend" },
  { emoji: "😰", label: "Gestresst" },
];

const MoodSelector = ({ onMoodSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {moods.map((mood) => (
        <Button
          key={mood.emoji}
          onClick={() => onMoodSelect(mood)}
          className="text-2xl p-4"
        >
          {mood.emoji}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;