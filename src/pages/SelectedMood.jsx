import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import MoodBalls from '../components/MoodBalls';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const SelectedMood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const selectedEmotions = location.state?.selectedEmotions || [];
  const [userInputs, setUserInputs] = useState(Array(selectedEmotions.length).fill(''));
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);

  const currentEmotion = selectedEmotions[currentEmotionIndex] || t.defaultMood;

  const moodColors = {
    happy: '#FFD700',
    sad: '#4169E1',
    angry: '#FF4500',
    anxious: '#9932CC',
    tired: '#708090',
    calm: '#20B2AA',
    excited: '#FF69B4',
    stressed: '#FF6347',
    confident: '#32CD32',
    worried: '#DDA0DD',
  };

  useEffect(() => {
    const updateEntry = () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
      
      const updatedEntries = {
        ...existingEntries,
        [currentDate]: selectedEmotions.map((emotion, index) => ({
          emotion,
          text: userInputs[index] || ''
        }))
      };

      localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    };

    updateEntry();
  }, [userInputs, selectedEmotions]);

  const handleSubmit = () => {
    if (currentEmotionIndex < selectedEmotions.length - 1) {
      setCurrentEmotionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/confirmation-mood');
    }
  };

  const handleInputChange = (e) => {
    const newInputs = [...userInputs];
    newInputs[currentEmotionIndex] = e.target.value;
    setUserInputs(newInputs);
  };

  const handleMeditate = () => {
    navigate('/meditate');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <div className="menu-icon">
                <span className="w-full h-[2px] bg-current"></span>
                <span className="w-full h-[2px] bg-current"></span>
                <span className="w-full h-[2px] bg-current"></span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate('/home')}>{t.home || 'Home'}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/confirmation-mood')}>{t.entries || 'Entries'}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        <h2 className={`text-xl mb-4 z-10`}>{t.selectUpToThreeMoods}</h2>
        <MoodBalls 
          showText={true} 
          textColor="text-gray-700" 
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

export default SelectedMood;
