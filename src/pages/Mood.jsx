import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import EmotionBalls from '../components/EmotionBalls';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Mood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customEmotion, setCustomEmotion] = useState('');

  const handleEmotionClick = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleCustomEmotionSubmit = () => {
    if (customEmotion && selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, customEmotion]);
      setCustomEmotion('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">{t.selectEmotions}</h2>
        <p className="mb-6">{t.selectUpTo3Emotions}</p>
        <EmotionBalls
          selectedEmotions={selectedEmotions}
          onEmotionClick={handleEmotionClick}
          onCustomEmotionClick={() => setIsModalOpen(true)}
        />
      </div>
      {selectedEmotions.length > 0 && (
        <Button
          onClick={() => navigate('/activity')}
          className="fixed bottom-4 right-4 rounded-full"
          size="icon"
        >
          <ArrowRight />
        </Button>
      )}
      <Button
        onClick={() => navigate('/')}
        className="fixed bottom-4 left-4 rounded-full"
        size="icon"
      >
        <ArrowLeft />
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
            <Button onClick={handleCustomEmotionSubmit}>{t.addEmotion}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mood;