import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Link, useNavigate } from 'react-router-dom';
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
import { Input } from "@/components/ui/input"
import { Share2, Instagram, AtSign, X, Home, ArrowLeft } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [showInitialAssessment, setShowInitialAssessment] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [customActivity, setCustomActivity] = useState('');
  const [savedActivities, setSavedActivities] = useState([]);
  const [initialMoodRating, setInitialMoodRating] = useState(null);
  const [finalMoodRating, setFinalMoodRating] = useState(null);
  const [positiveMessage, setPositiveMessage] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [totalMoodImprovement, setTotalMoodImprovement] = useState(0);
  const [averageMood, setAverageMood] = useState(0);

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem('customActivities') || '[]');
    setSavedActivities(storedActivities);
    const storedMoodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(storedMoodHistory);
    const storedUserCount = parseInt(localStorage.getItem('userCount') || '0');
    setUserCount(storedUserCount);
    const storedTotalMoodImprovement = parseFloat(localStorage.getItem('totalMoodImprovement') || '0');
    setTotalMoodImprovement(storedTotalMoodImprovement);
  }, []);

  useEffect(() => {
    if (selectedMood && selectedMood.label) {
      const personalizedActivity = getPersonalizedRecommendation(moodHistory, selectActivity(selectedMood.label, language));
      setSuggestedActivity(personalizedActivity || selectActivity(selectedMood.label, language));
    }
  }, [selectedMood, language, moodHistory]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes default

  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: time, autoStart: false });

  const handleNotificationClick = () => {
    setShowInitialAssessment(true);
  };

  const handleInitialAssessmentComplete = (moodValue) => {
    setInitialMoodRating(moodValue);
    setShowInitialAssessment(false);
    setShowMoodSelector(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const personalizedActivity = getPersonalizedRecommendation(moodHistory, selectActivity(mood.label, language));
    setSuggestedActivity(personalizedActivity || selectActivity(mood.label, language));
  };

  const handleStartTimer = () => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + timerMinutes * 60);
    restart(newTime);
  };

  const handleEndActivity = () => {
    pause();
    setShowReflection(true);
  };

  const handleReflectionComplete = (reflection) => {
    setShowReflection(false);
    setShowMindfulness(true);
    // Here you could save the reflection to a database or local storage
  };

  const handleSkipReflection = () => {
    setShowReflection(false);
    setShowMindfulness(true);
  };

  const handleMindfulnessComplete = () => {
    setShowMindfulness(false);
    setShowMoodRating(true);
  };

  const handleBackFromMindfulness = () => {
    setShowMindfulness(false);
    setShowReflection(true);
  };

  const handleMoodRating = (rating) => {
    console.log(`Initial mood: ${initialMoodRating}, Mood after activity: ${rating}`);
    const moodImprovement = rating - initialMoodRating;
    setFinalMoodRating(rating);

    const newMoodEntry = {
      date: new Date().toISOString(),
      mood: rating
    };
    const updatedMoodHistory = [...moodHistory, newMoodEntry];
    setMoodHistory(updatedMoodHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));

    // Update user count and total mood improvement
    const newUserCount = userCount + 1;
    const newTotalMoodImprovement = totalMoodImprovement + moodImprovement;
    setUserCount(newUserCount);
    setTotalMoodImprovement(newTotalMoodImprovement);
    localStorage.setItem('userCount', newUserCount.toString());
    localStorage.setItem('totalMoodImprovement', newTotalMoodImprovement.toString());

    // Calculate average mood including the current rating
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
    setShowMoodSelector(false);
    setInitialMoodRating(null);
    setFinalMoodRating(null);
    setShowInitialAssessment(false);
    setAverageMood(0);
  };

  const handleShare = (platform) => {
    const shareText = t.shareMessage
      .replace('{initial}', initialMoodRating)
      .replace('{final}', finalMoodRating)
      .replace('{activity}', suggestedActivity.name);
    let shareUrl;

    switch (platform) {
      case 'instagram':
        shareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}&caption=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'threads':
        shareUrl = `https://www.threads.net/`;
        break;
      default:
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    }

    window.open(shareUrl, '_blank');
  };

  const handleSaveCustomActivity = () => {
    if (customActivity.trim() !== '') {
      const updatedActivities = [...savedActivities, customActivity];
      setSavedActivities(updatedActivities);
      localStorage.setItem('customActivities', JSON.stringify(updatedActivities));
      setCustomActivity('');
    }
  };

  const handleSelectCustomActivity = (activity) => {
    setSuggestedActivity({ name: activity });
  };

  const handleDeleteCustomActivity = (indexToDelete) => {
    const updatedActivities = savedActivities.filter((_, index) => index !== indexToDelete);
    setSavedActivities(updatedActivities);
    localStorage.setItem('customActivities', JSON.stringify(updatedActivities));
  };

  const showLanguageToggle = !showInitialAssessment && !showMoodSelector && !selectedMood && !showMoodRating && !showReflection && !showMindfulness;

  const averageMoodImprovement = userCount > 0 ? (totalMoodImprovement / userCount) * 10 : 0;

  const handleGoBack = () => {
    if (showMoodRating) {
      setShowMoodRating(false);
      setShowMindfulness(true);
    } else if (showMindfulness) {
      setShowMindfulness(false);
      setShowReflection(true);
    } else if (showReflection) {
      setShowReflection(false);
      setSelectedMood(null);
      setSuggestedActivity(null);
    } else if (selectedMood) {
      setSelectedMood(null);
      setSuggestedActivity(null);
      setShowMoodSelector(true);
    } else if (showMoodSelector) {
      setShowMoodSelector(false);
      setShowInitialAssessment(true);
    } else if (showInitialAssessment) {
      setShowInitialAssessment(false);
    }
  };

  const handleGoHome = () => {
    handleEndSession();
    setShowReflection(false);
    setShowMindfulness(false);
    navigate('/');
  };

  const showBackButton = showInitialAssessment || showMoodSelector || selectedMood || showMoodRating || showReflection || showMindfulness;

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
        {!showInitialAssessment && !showMoodSelector && !selectedMood && (
          <>
            <div className="animated-title w-full h-full flex flex-col items-center justify-between">
              <div className="flex-grow flex items-center justify-center flex-col">
                <h1 className="mooody-title text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody mb-4 opacity-0 animate-fade-in-delayed" style={{ marginTop: '-5cm' }}>MOOODY</h1>
                <p className="text-lg sm:text-xl md:text-2xl mt-4 text-center max-w-2xl opacity-0 animate-fade-in-more-delayed relative z-10" style={{ marginTop: '-7rem' }}>Weil 'Wie geht's?' oft nicht ausreicht</p>
              </div>
              <div className="ball ball1"></div>
              <div className="ball ball2"></div>
              <div className="ball ball3"></div>
              <div className="ball ball4"></div>
              <div className="ball ball5"></div>
              <div className="ball ball6"></div>
              <div className="ball ball7"></div>
              <div className="ball ball8"></div>
              <div className="ball ball9"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16" style={{ marginLeft: '-120px' }}>
                <NotificationButton onClick={handleNotificationClick} />
              </div>
            </div>
          </>
        )}
      </div>
      {showInitialAssessment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-sm w-full">
            <InitialMoodAssessment onAssessmentComplete={handleInitialAssessmentComplete} />
          </div>
        </div>
      )}
      {showMoodSelector && !selectedMood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-sm w-full">
            <h1 className="mooody-title text-3xl sm:text-4xl font-bold mb-6 rounded-moody">MOOODY</h1>
            <MoodSelector onMoodSelect={handleMoodSelect} title={t.moodSelectorTitle} />
          </div>
        </div>
      )}
      {selectedMood && !showMoodRating && !showReflection && !showMindfulness && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md w-full">
            <h1 className="mooody-title text-3xl sm:text-4xl font-bold mb-6 rounded-moody">MOOODY</h1>
            <p className="text-xl mb-4">
              {t.youFeelLabel} {selectedMood.emoji} {selectedMood.label && t[selectedMood.label.toLowerCase()]}
            </p>
            {suggestedActivity && (
              <div className="mt-6">
                <p className="text-lg mb-2">{t.suggestedActivityLabel}</p>
                <p className="text-2xl font-bold mb-6">{suggestedActivity.name}</p>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 1)}
                      className="w-20 text-center"
                      min="1"
                    />
                    <span>{t.timerLabel}</span>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    {!isRunning ? (
                      <Button onClick={handleStartTimer} className="w-full">{t.startTimer}</Button>
                    ) : (
                      <div className="text-2xl font-bold mb-4">
                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                      </div>
                    )}
                    <div className="flex space-x-2">
                      {isRunning ? (
                        <Button onClick={pause}>{t.pauseTimer}</Button>
                      ) : (
                        <Button onClick={resume} disabled={seconds === 0 && minutes === 0}>{t.resumeTimer}</Button>
                      )}
                      <Button onClick={handleEndActivity}>{t.endActivity}</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">{t.addCustomActivity}</h2>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  placeholder={t.newActivityPlaceholder}
                />
                <Button onClick={handleSaveCustomActivity}>{t.saveActivity}</Button>
              </div>
            </div>
            {savedActivities.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">{t.savedActivities}</h3>
                <ul className="space-y-2">
                  {savedActivities.map((activity, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span className="text-sm">{activity}</span>
                      <div>
                        <Button onClick={() => handleSelectCustomActivity(activity)} className="mr-2 text-xs">{t.selectActivity}</Button>
                        <Button onClick={() => handleDeleteCustomActivity(index)} variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {showReflection && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md w-full">
            <ReflectionPrompt onComplete={handleReflectionComplete} onSkip={handleSkipReflection} />
          </div>
        </div>
      )}
      {showMindfulness && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md w-full">
            <MindfulnessExercise onComplete={handleMindfulnessComplete} onBack={handleBackFromMindfulness} />
          </div>
        </div>
      )}
      {showMoodRating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h1 className="mooody-title text-3xl sm:text-4xl font-bold mb-6 rounded-moody">MOOODY</h1>
            {positiveMessage ? (
              <div>
                <p className="text-xl font-bold text-green-600 mb-4">{positiveMessage}</p>
                <p className="text-lg mb-4">{t.moodImprovement.replace('{initial}', initialMoodRating).replace('{final}', finalMoodRating)}</p>
                <p className="text-md mb-4">{t.activityDone.replace('{activity}', suggestedActivity?.name)}</p>
                <p className="text-lg mb-4">{t.averageMood.replace('{average}', averageMood.toFixed(1))}</p>
                <ProgressTracker moodData={moodHistory} />
                <UserStats userCount={userCount} averageMoodImprovement={averageMoodImprovement} />
                <p className="text-lg font-semibold mt-6 mb-2">{t.shareProgressCTA}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Button onClick={() => handleShare('instagram')}><Instagram className="h-4 w-4 mr-2" /> Instagram</Button>
                  <Button onClick={() => handleShare('twitter')}>X</Button>
                  <Button onClick={() => handleShare('facebook')}>Meta</Button>
                  <Button onClick={() => handleShare('threads')}><AtSign className="h-4 w-4 mr-2" /> Threads</Button>
                </div>
                <Button onClick={handleEndSession} className="mt-4 w-full">{t.newSession}</Button>
              </div>
            ) : (
              <MoodRatingScale onRatingSelect={handleMoodRating} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;