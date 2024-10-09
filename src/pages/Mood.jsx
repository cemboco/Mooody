import React, { useState, useEffect } from 'react';
import MoodBalls from '../components/MoodBalls';
import CustomEmotionModal from '../components/CustomEmotionModal';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { translations } from '../utils/translations';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import { useLanguage } from '../contexts/LanguageContext';

const Mood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customEmotion, setCustomEmotion] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleEmotionSelect = (emotion) => {
    if (emotion === 'custom' && !customEmotion) {
      setIsModalOpen(true);
    } else if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleCustomEmotionAdd = (newEmotion) => {
    setCustomEmotion(newEmotion);
    setSelectedEmotions([...selectedEmotions, newEmotion]);
    setIsModalOpen(false);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col bg-cover bg-center text-mooody-green overflow-hidden ${fadeIn ? 'fade-in' : ''}`} style={{ backgroundImage: "url('/Bg.png')" }}>
      <style>{`
        @keyframes clarify {
          from { filter: blur(5px); opacity: 0; }
          to { filter: blur(0); opacity: 1; }
        }
        .clarify-text {
          animation: clarify 1s ease-out forwards;
        }
      `}</style>
      <div className="flex-grow flex flex-col items-center justify-start p-4 pt-16">
        <h1 className={`text-3xl sm:text-4xl mb-8 z-10 ${fadeIn ? 'clarify-text' : ''} font-['Bricolage_Grotesque'] text-center`}>{t.selectUpToThreeMoods}</h1>
        <MoodBalls 
          showText={true} 
          textColor="text-black-600" 
          selectedEmotions={selectedEmotions}
          onEmotionSelect={handleEmotionSelect}
          onCustomEmotionClick={() => setIsModalOpen(true)}
          customEmotion={customEmotion}
        />
      </div>
      {selectedEmotions.length > 0 && (
        <Button
          onClick={() => navigate('/selected-mood', { state: { selectedEmotions } })}
          className="fixed bottom-4 right-4 z-[60] rounded-full"
          size="icon"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
      <CustomEmotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleCustomEmotionAdd}
      />
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
    </div>
  );
};

export default Mood;