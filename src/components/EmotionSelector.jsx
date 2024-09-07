import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const EmotionSelector = ({ selectedEmotions, onEmotionSelect, onCustomEmotionAdd }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customEmotion, setCustomEmotion] = useState('');

  const emotions = [
    "happy", "sad", "angry", "anxious", "tired",
    "excited", "calm", "frustrated", "confused", "loved"
  ];

  const handleCustomEmotionSubmit = () => {
    if (customEmotion.trim()) {
      onCustomEmotionAdd(customEmotion.trim());
      setCustomEmotion('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {emotions.map((emotion) => (
        <Button
          key={emotion}
          onClick={() => onEmotionSelect(emotion)}
          className={`h-24 w-24 rounded-full text-sm ${
            selectedEmotions.includes(emotion)
              ? 'bg-mooody-green text-white scale-110'
              : 'bg-white text-mooody-green'
          }`}
        >
          {t[emotion] || emotion}
        </Button>
      ))}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="h-24 w-24 rounded-full bg-white text-mooody-green text-4xl"
      >
        +
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.addCustomEmotion}</DialogTitle>
          </DialogHeader>
          <Input
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            placeholder={t.enterCustomEmotion}
          />
          <DialogFooter>
            <Button onClick={handleCustomEmotionSubmit}>{t.add}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmotionSelector;