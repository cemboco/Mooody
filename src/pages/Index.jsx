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
import { selectActivity } from '../utils/gameSelector';
import { getPersonalizedRecommendation } from '../utils/personalizedRecommendations';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Button } from "@/components/ui/button"
import { Share2, Instagram, AtSign, X, Home, ArrowLeft } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [initialMoodRating, setInitialMoodRating] = useState(null);
  const [finalMoodRating, setFinalMoodRating] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [totalMoodImprovement, setTotalMoodImprovement] = useState(0);

  useEffect(() => {
    const storedMoodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(storedMoodHistory);
    setUserCount(parseInt(localStorage.getItem('userCount') || '0'));
    setTotalMoodImprovement(parseFloat(localStorage.getItem('totalMoodImprovement') || '0'));
  }, []);

  useEffect(() => {
    if (selectedMood && selectedMood.label) {
      const personalizedActivity = getPersonalizedRecommendation(moodHistory, selectActivity(selectedMood.label, language));
      setSuggestedActivity(personalizedActivity || selectActivity(selectedMood.label, language));
    }
  }, [selectedMood, language, moodHistory]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    handlePageChange(3);
  };
  const handleInitialAssessmentComplete = (moodValue) => {
    setInitialMoodRating(moodValue);
    handlePageChange(4);
  };
  const handleActivityComplete = () => handlePageChange(5);
  const handleReflectionComplete = () => handlePageChange(6);
  const handleMindfulnessComplete = () => handlePageChange(3);
  const handleMoodRating = (rating) => {
    setFinalMoodRating(rating);
    updateMoodHistory(rating);
    handlePageChange(8);
  };

  const updateMoodHistory = (rating) => {
    const moodImprovement = rating - initialMoodRating;
    const newMoodEntry = { date: new Date().toISOString(), mood: rating };
    const updatedMoodHistory = [...moodHistory, newMoodEntry];
    setMoodHistory(updatedMoodHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));

    const newUserCount = userCount + 1;
    const newTotalMoodImprovement = totalMoodImprovement + moodImprovement;
    setUserCount(newUserCount);
    setTotalMoodImprovement(newTotalMoodImprovement);
    localStorage.setItem('userCount', newUserCount.toString());
    localStorage.setItem('totalMoodImprovement', newTotalMoodImprovement.toString());
  };

  const handleEndSession = () => {
    handlePageChange(1);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setInitialMoodRating(null);
    setFinalMoodRating(null);
  };

  const handleShare = (platform) => {
    const shareText = t.shareMessage
      .replace('{initial}', initialMoodRating)
      .replace('{final}', finalMoodRating)
      .replace('{activity}', suggestedActivity.name);
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      instagram: `https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}&caption=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`,
      threads: 'https://www.threads.net/'
    };
    window.open(shareUrls[platform] || shareUrls.twitter, '_blank');
  };

  const renderPage = () => {
    const pages = {
      1: <LandingPage onNotificationClick={() => handlePageChange(2)} />,
      2: <MindfulnessExercise onComplete={handleMindfulnessComplete} onBack={() => handlePageChange(1)} />,
      3: <MoodSelector onMoodSelect={handleMoodSelect} title={t.moodSelectorTitle} />,
      4: <InitialMoodAssessment onAssessmentComplete={handleInitialAssessmentComplete} />,
      5: <SuggestedActivity activity={suggestedActivity} onComplete={handleActivityComplete} />,
      6: <ReflectionPrompt onComplete={handleReflectionComplete} onSkip={handleReflectionComplete} />,
      7: <MoodRatingScale onRatingSelect={handleMoodRating} />,
      8: <ResultsPage
           initialMoodRating={initialMoodRating}
           finalMoodRating={finalMoodRating}
           suggestedActivity={suggestedActivity}
           moodHistory={moodHistory}
           userCount={userCount}
           averageMoodImprovement={(userCount > 0 ? (totalMoodImprovement / userCount) * 10 : 0)}
           onShare={handleShare}
           onNewSession={handleEndSession}
         />
    };
    return pages[currentPage] || null;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody text-moodyText overflow-hidden">
      {currentPage === 1 && <LanguageToggle />}
      <Button onClick={() => navigate('/')} className="fixed top-4 right-4 z-[60]" variant="outline" size="icon">
        <Home className="h-4 w-4" />
      </Button>
      {currentPage > 1 && (
        <Button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} className="fixed bottom-4 left-4 z-[60]" variant="outline" size="icon">
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
        {t.disclaimerText}
      </div>
    </div>
  );
};

const LandingPage = ({ onNotificationClick }) => (
  <div className="animated-title w-full h-full flex flex-col items-center justify-between">
    <div className="flex-grow flex items-center justify-center flex-col">
      <h1 className="mooody-title text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody mb-4 opacity-0 animate-fade-in-delayed" style={{ marginTop: '-5cm' }}>MOOODY</h1>
      <p className="text-2xl sm:text-3xl md:text-4xl mt-4 text-center max-w-2xl opacity-0 animate-fade-in-more-delayed relative z-10 font-hevilla" style={{ marginTop: '-7rem' }}>
        {translations[useLanguage().language].subtitle}
      </p>
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16" style={{ marginLeft: '-120px' }}>
      <div className="animate-fade-in-button">
        <NotificationButton onClick={onNotificationClick} />
      </div>
    </div>
  </div>
);

const SuggestedActivity = ({ activity, onComplete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md w-full">
    <h2 className="text-2xl font-bold mb-4">{translations[useLanguage().language].suggestedActivityLabel}</h2>
    <p className="text-xl mb-6">{activity?.name}</p>
    <Button onClick={onComplete} className="w-full">{translations[useLanguage().language].endActivity}</Button>
  </div>
);

const ResultsPage = ({ initialMoodRating, finalMoodRating, suggestedActivity, moodHistory, userCount, averageMoodImprovement, onShare, onNewSession }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
      <h1 className="mooody-title text-3xl sm:text-4xl font-bold mb-6 rounded-moody">MOOODY</h1>
      <p className="text-xl mb-4">{t.moodImprovement.replace('{initial}', initialMoodRating).replace('{final}', finalMoodRating)}</p>
      <p className="text-md mb-4">{t.activityDone.replace('{activity}', suggestedActivity?.name)}</p>
      <ProgressTracker moodData={moodHistory} />
      <UserStats userCount={userCount} averageMoodImprovement={averageMoodImprovement} />
      <p className="text-lg font-semibold mt-6 mb-2">{t.shareProgressCTA}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Button onClick={() => onShare('instagram')}><Instagram className="h-4 w-4 mr-2" /> Instagram</Button>
        <Button onClick={() => onShare('twitter')}>X</Button>
        <Button onClick={() => onShare('facebook')}>Meta</Button>
        <Button onClick={() => onShare('threads')}><AtSign className="h-4 w-4 mr-2" /> Threads</Button>
      </div>
      <Button onClick={onNewSession} className="mt-4 w-full">{t.newSession}</Button>
    </div>
  );
};

export default Index;