import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const initialMoods = [
  { emoji: "😊", labelKey: "happy" },
  { emoji: "😢", labelKey: "sad" },
  { emoji: "😴", labelKey: "tired" },
  { emoji: "😠", labelKey: "angry" },
  { emoji: "😰", labelKey: "stressed" },
  { emoji: "😨", labelKey: "anxious" },
];

const emojiOptions = [
  "😊", "😢", "😴", "😠", "😰", "😨", "😍", "🤔", "😎", "🙃",
  "😇", "🤯", "😤", "🥳", "😌", "🤗", "😂", "🥰", "😋", "😒",
  "😩", "😭", "🥺", "😳", "🤩", "🤪", "😵", "🤓", "😏", "😑"
];

const MoodSelector = ({ onMoodSelect }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [moods, setMoods] = useState(initialMoods);
  const [selectedMood, setSelectedMood] = useState(null);
  const [customMood, setCustomMood] = useState('');
  const [customEmoji, setCustomEmoji] = useState('😊');

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
      const newMood = { emoji: customEmoji, labelKey: customMood.trim() };
      setMoods([...moods, newMood]);
      setCustomMood('');
      setCustomEmoji('😊');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t.moodSelectorTitle}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <Button
            key={mood.labelKey}
            onClick={() => handleMoodClick(mood)}
            className={`text-2xl p-4 ${selectedMood === mood ? 'ring-2 ring-blue-500' : ''}`}
          >
            {mood.emoji}
          </Button>
        ))}
      </div>
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-14 text-2xl">
              {customEmoji}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-6 gap-2">
              {emojiOptions.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  className="text-2xl p-2"
                  onClick={() => setCustomEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Input
          type="text"
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          placeholder={t.newActivityPlaceholder}
        />
        <Button onClick={handleAddCustomMood}>{t.saveActivity}</Button>
      </div>
      {selectedMood && (
        <div className="space-y-4 mt-6">
          <p className="text-lg">{t.youFeelLabel} {selectedMood.emoji} {t[selectedMood.labelKey]}</p>
          <Button onClick={handleSubmit} className="w-full">{t.selectActivity}</Button>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;