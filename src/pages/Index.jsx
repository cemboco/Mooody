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
import { Input } from "@/components/ui/input"
import { Share2, Instagram, AtSign, X, Home, ArrowLeft } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [initialMoodRating, setInitialMoodRating] = useState(null);
  const [finalMoodRating, setFinalMoodRating] = useState(null);
  const [positiveMessage, setPositiveMessage] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [totalMoodImprovement, setTotalMoodImprovement] = useState(0);
  const [averageMood, setAverageMood] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    const storedMoodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(storedMoodHistory);
    const storedUserCount = parseInt(localStorage.getItem('userCount') || '0');
    setUserCount(storedUserCount);
    const storedTotalMoodImprovement = parseFloat(localStorage.getItem('totalMoodImprovement') || '0');
    setTotalMoodImprovement(storedTotalMoodImprovement);
  }, []);

  useEffect(() => {
    if (currentPage === 2) {
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleNotificationClick = () => {
    setCurrentPage(2);
  };

  const handleContinueClick = () => {
    setCurrentPage(3);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const personalizedActivity = getPersonalizedRecommendation(moodHistory, selectActivity(mood.label, language));
    setSuggestedActivity(personalizedActivity || selectActivity(mood.label, language));
    setCurrentPage(4);
  };

  const handleMoodRating = (rating) => {
    const moodImprovement = rating - initialMoodRating;
    setFinalMoodRating(rating);

    const newMoodEntry = {
      date: new Date().toISOString(),
      mood: rating
    };
    const updatedMoodHistory = [...moodHistory, newMoodEntry];
    setMoodHistory(updatedMoodHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));

    const newUserCount = userCount + 1;
    const newTotalMoodImprovement = totalMoodImprovement + moodImprovement;
    setUserCount(newUserCount);
    setTotalMoodImprovement(newTotalMoodImprovement);
    localStorage.setItem('userCount', newUserCount.toString());
    localStorage.setItem('totalMoodImprovement', newTotalMoodImprovement.toString());

    const totalMood = updatedMoodHistory.reduce((sum, entry) => sum + entry.mood, 0);
    const newAverageMood = totalMood / updatedMoodHistory.length;
    setAverageMood(newAverageMood);

    setPositiveMessage(t.motivationalMessages[Math.floor(Math.random() * t.motivationalMessages.length)]);
  };

  const handleEndSession = () => {
    setPositiveMessage('');
    setShowMoodRating(false);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setInitialMoodRating(null);
    setFinalMoodRating(null);
    setAverageMood(0);
    setCurrentPage(1);
  };

  const handleShare = (platform) => {
    const shareText = t.shareMessage
      .replace('{initial}', initialMoodRating)
      .replace('{final}', finalMoodRating)
      .replace('{activity}', suggestedActivity.name);
    let shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    if (platform === 'instagram') {
      shareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}&caption=${encodeURIComponent(shareText)}`;
    }
    window.open(shareUrl, '_blank');
  };

  const handleGoBack = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  };

  const handleGoHome = () => {
    handleEndSession();
    navigate('/');
    setCurrentPage(1);
  };

  const showBackButton = currentPage > 1;
  const showLanguageToggle = currentPage === 1;

  const averageMoodImprovement = userCount > 0 ? (totalMoodImprovement / userCount) * 10 : 0;

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
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold mb-4 opacity-0 animate-fade-in">{language === 'de' ? 'Atme tief durch' : 'Take a deep breath'}</h2>
            {showContinueButton && (
              <Button onClick={handleContinueClick} className="mt-4 opacity-0 animate-fade-in">
                {t.continue}
              </Button>
            )}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold mb-4">{t.moodSelectorTitle}</h2>
            <MoodSelector onMoodSelect={handleMoodSelect} />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold mb-4">{t.suggestedActivityLabel}</h2>
            {suggestedActivity && (
              <>
                <p className="text-xl mb-4">{suggestedActivity.name}</p>
                <Button onClick={() => setCurrentPage(5)}>{t.startActivity}</Button>
              </>
            )}
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold mb-4">{suggestedActivity.name}</h2>
            <Button onClick={() => setShowReflection(true)}>{t.endActivity}</Button>
          </div>
        );
      case 6:
        return showReflection ? (
          <ReflectionPrompt 
            onComplete={() => {
              setShowReflection(false);
              setShowMindfulness(true);
            }} 
            onSkip={() => {
              setShowReflection(false);
              setShowMindfulness(true);
            }}
          />
        ) : showMindfulness ? (
          <MindfulnessExercise 
            onComplete={() => {
              setShowMindfulness(false);
              setShowMoodRating(true);
            }}
            onBack={() => {
              setShowMindfulness(false);
              setShowReflection(true);
            }}
          />
        ) : (
          <MoodRatingScale onRatingSelect={handleMoodRating} />
        );
      case 7:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-xl font-bold text-green-600 mb-4">{positiveMessage}</p>
            <p className="text-lg mb-4">{t.moodImprovement.replace('{initial}', initialMoodRating).replace('{final}', finalMoodRating)}</p>
            <p className="text-md mb-4">{t.activityDone.replace('{activity}', suggestedActivity?.name)}</p>
            <p className="text-lg mb-4">{t.averageMood.replace('{average}', averageMood.toFixed(1))}</p>
            <ProgressTracker moodData={moodHistory} />
            <UserStats userCount={userCount} averageMoodImprovement={averageMoodImprovement} />
            <p className="text-lg font-semibold mt-6 mb-2">{t.shareProgressCTA}</p>
            <div className="flex space-x-2 mt-4">
              <Button onClick={() => handleShare('instagram')}><Instagram className="h-4 w-4 mr-2" /> Instagram</Button>
              <Button onClick={() => handleShare('twitter')}>Twitter</Button>
            </div>
            <Button onClick={handleEndSession} className="mt-4">{t.newSession}</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody text-moodyText overflow-hidden">
      {showLanguageToggle && <LanguageToggle />}
      <Button
        onClick={handleGoHome}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      {showBackButton && (
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
        <div className="fixed top-4 left-4 z-[70] bg-white px-2 py-1 rounded-full text-sm font-bold">
          {currentPage}/7
        </div>
        {renderPage()}
      </div>
    </div>
  );
};

export default Index;