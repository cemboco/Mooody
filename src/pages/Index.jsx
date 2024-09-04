import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import MoodRatingScale from '../components/MoodRatingScale';
import InitialMoodAssessment from '../components/InitialMoodAssessment';
import LanguageToggle from '../components/LanguageToggle';
import ReflectionPrompt from '../components/ReflectionPrompt';
import ProgressTracker from '../components/ProgressTracker';
import MindfulnessExercise from '../components/MindfulnessExercise';
import UserStats from '../components/UserStats';
import Settings from '../components/Settings';
import { selectActivity } from '../utils/gameSelector';
import { getPersonalizedRecommendation } from '../utils/personalizedRecommendations';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Settings as SettingsIcon } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [showInitialAssessment, setShowInitialAssessment] = useState(true);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [initialMoodRating, setInitialMoodRating] = useState(null);
  const [finalMoodRating, setFinalMoodRating] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleInitialAssessment = (rating) => {
    setInitialMoodRating(rating);
    setShowInitialAssessment(false);
    setShowMoodSelector(true);
    setCurrentPage(2);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const activity = selectActivity(mood.labelKey, language);
    setSuggestedActivity(activity);
    setShowMoodSelector(false);
    setShowMindfulness(true);
    setCurrentPage(3);
  };

  const handleMindfulnessComplete = () => {
    setShowMindfulness(false);
    setShowMoodRating(true);
    setCurrentPage(4);
  };

  const handleFinalRating = (rating) => {
    setFinalMoodRating(rating);
    setShowMoodRating(false);
    setShowReflection(true);
    setCurrentPage(5);
  };

  const handleReflectionComplete = () => {
    setShowReflection(false);
    updateMoodHistory();
    setCurrentPage(6);
  };

  const updateMoodHistory = () => {
    const newEntry = {
      date: new Date().toISOString(),
      initialMood: initialMoodRating,
      finalMood: finalMoodRating,
      activity: suggestedActivity.name
    };
    setMoodHistory(prevHistory => [...prevHistory, newEntry]);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleGoBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <InitialMoodAssessment onAssessmentComplete={handleInitialAssessment} />;
      case 2:
        return <MoodSelector onMoodSelect={handleMoodSelect} />;
      case 3:
        return <MindfulnessExercise onComplete={handleMindfulnessComplete} />;
      case 4:
        return <MoodRatingScale onRatingSelect={handleFinalRating} />;
      case 5:
        return <ReflectionPrompt onComplete={handleReflectionComplete} />;
      case 6:
        return (
          <>
            <ProgressTracker moodData={moodHistory} />
            <UserStats userCount={moodHistory.length} averageMoodImprovement={calculateAverageMoodImprovement()} />
          </>
        );
      default:
        return null;
    }
  };

  const calculateAverageMoodImprovement = () => {
    if (moodHistory.length === 0) return 0;
    const totalImprovement = moodHistory.reduce((sum, entry) => sum + (entry.finalMood - entry.initialMood), 0);
    return totalImprovement / moodHistory.length;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody text-moodyText overflow-hidden">
      <LanguageToggle />
      <Button
        onClick={() => setCurrentPage(1)}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <Button
        onClick={handleOpenSettings}
        className="fixed top-4 right-16 z-[60]"
        variant="outline"
        size="icon"
      >
        <SettingsIcon className="h-4 w-4" />
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
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
        <div className="ball ball4"></div>
        <div className="ball ball5"></div>
        <div className="ball ball6"></div>
        <div className="ball ball7"></div>
        <div className="ball ball8"></div>
        <div className="ball ball9"></div>
        
        <div className="fixed top-4 left-4 z-[70] bg-white px-2 py-1 rounded-full text-sm font-bold">
          {currentPage}/6
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {renderPage()}
        </div>
      </div>
      
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[80]">
          <Settings onClose={handleCloseSettings} />
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 right-0 text-center p-2 bg-gray-100 text-gray-500 text-xs italic">
        {t.disclaimerText}
      </div>
    </div>
  );
};

export default Index;