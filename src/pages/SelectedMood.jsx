import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, ArrowLeft } from 'lucide-react';
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.setAttribute('data-name', 'bmc-button');
    script.setAttribute('data-slug', 'mooody.space');
    script.setAttribute('data-color', '#FFDD00');
    script.setAttribute('data-emoji', '☕');
    script.setAttribute('data-font', 'Cookie');
    script.setAttribute('data-text', 'Buy me a coffee');
    script.setAttribute('data-outline-color', '#000000');
    script.setAttribute('data-font-color', '#000000');
    script.setAttribute('data-coffee-color', '#ffffff');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = () => {
    if (currentEmotionIndex < selectedEmotions.length - 1) {
      setCurrentEmotionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/login');
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
      <div className="relative w-full h-screen flex flex-col items-center justify-start p-4 pt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t.whatsMakingYouFeel.replace('[emotion]', t[currentEmotion] || currentEmotion)}
        </h2>
        <Textarea
          value={userInputs[currentEmotionIndex] || ''}
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
            {t.meditate || 'Meditate'}
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-full w-12 h-12 flex items-center justify-center bg-mooody-green hover:bg-mooody-dark-green"
            disabled={!userInputs[currentEmotionIndex] || !userInputs[currentEmotionIndex].trim()}
          >
            <Check className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <a href="https://www.buymeacoffee.com/mooody.space" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: '60px', width: '217px' }} />
        </a>
      </div>
    </div>
  );
};

export default SelectedMood;