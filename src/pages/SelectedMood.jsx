import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Home, Check, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

const SelectedMood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const selectedEmotions = location.state?.selectedEmotions || [];
  const [userInputs, setUserInputs] = useState(Array(selectedEmotions.length).fill(''));
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);

  const currentEmotion = selectedEmotions[currentEmotionIndex] || t.defaultMood;

  const handleSubmit = () => {
    if (userInputs[currentEmotionIndex].trim()) {
      console.log('User input:', userInputs[currentEmotionIndex]); // Log user input to console
      
      if (currentEmotionIndex < selectedEmotions.length - 1) {
        // Move to the next emotion
        setCurrentEmotionIndex(prevIndex => prevIndex + 1);
      } else {
        // Navigate to ConfirmationMood with all emotions and inputs
        const currentDate = new Date().toISOString();
        navigate('/confirmation-mood', {
          state: {
            date: currentDate,
            emotions: selectedEmotions,
            texts: userInputs,
          },
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const newInputs = [...userInputs];
    newInputs[currentEmotionIndex] = e.target.value;
    setUserInputs(newInputs);
  };

  const handleMeditate = () => {
    console.log('Meditate button clicked');
    // Add meditation feature logic here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mooody-yellow text-mooody-green overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/home')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <div className="relative w-full h-screen flex flex-col items-center justify-start p-4 pt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t.whatsMakingYouFeel.replace('[emotion]', t[currentEmotion] || currentEmotion)}
        </h2>
        <Textarea
          value={userInputs[currentEmotionIndex]}
          onChange={handleInputChange}
          placeholder={t.typeHere}
          className="w-full h-64 text-lg p-4 bg-white bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-mooody-green"
        />
        <div className="mt-8 flex flex-col items-center justify-between w-full max-w-md">
          <Button
            onClick={() => navigate('/mood')}
            className="flex items-center mb-4 w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToMoodSelection}
          </Button>
          <Button
            onClick={handleMeditate}
            className="w-full mb-4 bg-mooody-green hover:bg-mooody-dark-green text-white"
          >
            Meditate
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-full w-12 h-12 flex items-center justify-center bg-mooody-green hover:bg-mooody-dark-green"
            disabled={!userInputs[currentEmotionIndex].trim()}
          >
            <Check className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedMood;