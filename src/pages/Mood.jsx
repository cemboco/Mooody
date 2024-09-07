import React, { useState } from 'react';
import CustomEmotionModal from '../components/CustomEmotionModal';
import LanguageToggle from '../components/LanguageToggle';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import FloatingBalls from '../components/FloatingBalls';

const Mood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmotionSelect = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleCustomEmotionAdd = (newEmotion) => {
    // Here you would typically update your emotions list in a global state or context
    console.log('New custom emotion added:', newEmotion);
    setIsModalOpen(false);
  };

  const emotions = [
    "angry", "confident", "optimistic", "numb", "tired",
    "happy", "sad", "anxious", "calm", "worried"
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-xl mb-4 z-10">{t.selectUpToThreeMoods}</h2>
        <FloatingBalls>
          {emotions.map((emotion, index) => {
            const isSelected = selectedEmotions.includes(emotion);
            return (
              <div 
                key={emotion} 
                className={`ball ball${index + 1} flex items-center justify-center cursor-pointer transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}
                onClick={() => handleEmotionSelect(emotion)}
              >
                <span className={`${isSelected ? 'text-white font-bold' : 'text-gray-700'} text-sm`}>
                  {emotion}
                </span>
              </div>
            );
          })}
          <div 
            className="ball ball11 flex items-center justify-center bg-white cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-gray-700 text-2xl">+</span>
          </div>
        </FloatingBalls>
      </div>
      <CustomEmotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleCustomEmotionAdd}
      />
    </div>
  );
};

export default Mood;