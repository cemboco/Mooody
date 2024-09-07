import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const emotions = ['Happy', 'Sad', 'Excited', 'Angry', 'Calm', 'Anxious'];

const EmotionSelectionComponent = () => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customEmotion, setCustomEmotion] = useState('');
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

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
    <div className="flex flex-col h-screen bg-mooody-yellow p-4">
      <div className="flex items-center mb-4">
        <ArrowLeft className="text-mooody-green mr-4 cursor-pointer" onClick={() => navigate('/')} />
        <h1 className="text-mooody-green text-lg">{t.selectEmotions}</h1>
      </div>
      
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-2 text-mooody-green">{t.howAreYouFeeling}</h2>
        <p className="text-mooody-green mb-4">{t.selectUpTo3Emotions}</p>
        
        <div className="grid grid-cols-3 gap-4">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              className={`p-4 rounded-full ${
                selectedEmotions.includes(emotion)
                  ? 'bg-mooody-green text-white scale-110'
                  : 'bg-white text-mooody-green'
              } transition-all`}
              onClick={() => handleEmotionClick(emotion)}
            >
              {t[emotion.toLowerCase()] || emotion}
            </button>
          ))}
          <button
            className="p-4 rounded-full bg-white border-2 border-mooody-green text-mooody-green"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
          </button>
        </div>
      </div>
      
      {selectedEmotions.length > 0 && (
        <div className="flex justify-end">
          <button
            className="p-4 rounded-full bg-mooody-green"
            onClick={() => navigate('/mood')}
          >
            <ArrowRight className="text-white" />
          </button>
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

export default EmotionSelectionComponent;