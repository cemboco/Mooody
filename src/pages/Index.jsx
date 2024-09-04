import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import MoodRatingScale from '../components/MoodRatingScale';
import LanguageToggle from '../components/LanguageToggle';
import ReflectionPrompt from '../components/ReflectionPrompt';
import ProgressTracker from '../components/ProgressTracker';
import MindfulnessExercise from '../components/MindfulnessExercise';
import UserStats from '../components/UserStats';
import { selectActivity } from '../utils/gameSelector';
import { getPersonalizedRecommendation } from '../utils/personalizedRecommendations';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const storedMoodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(storedMoodHistory);
  }, []);

  useEffect(() => {
    if (selectedMood && selectedMood.label) {
      const personalizedActivity = getPersonalizedRecommendation(moodHistory, selectActivity(selectedMood.label, language));
      setSuggestedActivity(personalizedActivity || selectActivity(selectedMood.label, language));
    }
  }, [selectedMood, language, moodHistory]);

  const handleNotificationClick = () => {
    setCurrentPage(2);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentPage(4);
  };

  const handleEndSession = () => {
    setCurrentPage(1);
    setSelectedMood(null);
    setSuggestedActivity(null);
  };

  const handleGoBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoHome = () => {
    handleEndSession();
    navigate('/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="animated-title w-full h-full flex flex-col items-center justify-between">
            <div className="flex-grow flex items-center justify-center flex-col">
              <h1 className="mooody-title text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody mb-4 opacity-0 animate-fade-in-delayed" style={{ marginTop: '-5cm' }}>MOOODY</h1>
              <p className="text-2xl sm:text-3xl md:text-4xl mt-4 text-center max-w-2xl opacity-0 animate-fade-in-more-delayed relative z-10 font-hevilla" style={{ marginTop: '-7rem' }}>
                {t.subtitle}
              </p>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16" style={{ marginLeft: '-120px' }}>
              <div className="animate-fade-in-button">
                <NotificationButton onClick={handleNotificationClick} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="max-w-3xl w-full h-auto relative">
              <img 
                src="https://i.ibb.co/K0cJ96h/mood-assessment.png" 
                alt="Mood Assessment" 
                className="w-full h-auto object-contain rounded-xl shadow-lg" 
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-moody z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-sm w-full relative">
              <h1 className="mooody-title text-3xl sm:text-4xl font-bold mb-6 rounded-moody">MOOODY</h1>
              <MoodSelector onMoodSelect={handleMoodSelect} title={t.moodSelectorTitle} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody text-moodyText overflow-hidden">
      {currentPage === 1 && <LanguageToggle />}
      <Button
        onClick={handleGoHome}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      {currentPage > 1 && (
        <Button
          onClick={handleGoBack}
          className="fixed bottom-4 left-4 z-[60]"
          variant="outline"
          size="icon"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`ball ball${i + 1}`}></div>
        ))}
        <div className="fixed top-4 left-4 z-[70] bg-white px-2 py-1 rounded-full text-sm font-bold">
          {currentPage}/8
        </div>
        {renderPage()}
      </div>
      <div className="fixed bottom-0 left-0 right-0 text-center p-2 bg-gray-100 text-gray-500 text-xs italic">
        {language === 'de' ? 
          "Diese App ersetzt keine professionelle psychologische oder medizinische Beratung. Bei ernsthaften mentalen Problemen oder Krisen suchen Sie bitte einen Spezialisten oder Therapeuten auf." :
          "This app does not replace professional psychological or medical advice. For serious mental health issues or crises, please consult a specialist or therapist."
        }
      </div>
    </div>
  );
};

export default Index;