import React, { useState } from 'react';
import MoodBalls from '../components/MoodBalls';
import LanguageToggle from '../components/LanguageToggle';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

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
      <header className="flex justify-between items-center p-4">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="icon"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold">{t.selectEmotions}</h1>
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="icon"
        >
          <Home className="h-4 w-4" />
        </Button>
      </header>
      <LanguageToggle />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">{t.howAreYouFeeling}</h2>
        <p className="text-lg mb-6">{t.selectUpToThree}</p>
        <MoodBalls 
          showText={true} 
          textColor="text-gray-700" 
          selectedEmotions={selectedEmotions}
          onEmotionClick={handleEmotionClick}
          onCustomEmotionClick={() => setIsModalOpen(true)}
        />
      </div>
      {selectedEmotions.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={() => navigate('/third-page')}
            className="rounded-full bg-mooody-green hover:bg-mooody-dark-green"
            size="icon"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      )}
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