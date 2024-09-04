import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
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
import { Input } from "@/components/ui/input"
import { Share2, Instagram, AtSign, X, Home, ArrowLeft } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [showLanguageToggle, setShowLanguageToggle] = useState(true);
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
  const [showBackButton, setShowBackButton] = useState(false);

  const handleNotificationClick = () => {
    setShowInitialAssessment(true);
    setShowLanguageToggle(false);
  };

  const handleInitialAssessmentComplete = (rating) => {
    setInitialMoodRating(rating);
    setShowInitialAssessment(false);
    setShowMoodSelector(true);
    setShowBackButton(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const activity = selectActivity(mood.labelKey, language);
    setSuggestedActivity(activity);
    setShowMoodSelector(false);
  };

  const handleTimerComplete = () => {
    setShowMoodRating(true);
  };

  const handleMoodRating = (rating) => {
    setFinalMoodRating(rating);
    setShowMoodRating(false);
    setShowReflection(true);

    const improvement = rating - initialMoodRating;
    setTotalMoodImprovement(prev => prev + improvement);
    setUserCount(prev => prev + 1);

    const newMoodEntry = { date: new Date().toISOString(), mood: rating };
    setMoodHistory(prev => [...prev, newMoodEntry]);

    const avgMood = moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length;
    setAverageMood(avgMood);
  };

  const handleReflectionComplete = (reflection) => {
    setShowReflection(false);
    setShowMindfulness(true);
    // Here you could save the reflection to a database or state if needed
  };

  const handleMindfulnessComplete = () => {
    setShowMindfulness(false);
    // Reset the app state or navigate to a summary screen
    resetAppState();
  };

  const resetAppState = () => {
    setShowLanguageToggle(true);
    setShowInitialAssessment(false);
    setShowMoodSelector(false);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setShowMoodRating(false);
    setInitialMoodRating(null);
    setFinalMoodRating(null);
    setShowReflection(false);
    setShowMindfulness(false);
    setShowBackButton(false);
  };

  const handleGoHome = () => {
    resetAppState();
  };

  const handleGoBack = () => {
    if (showMoodSelector) {
      setShowMoodSelector(false);
      setShowInitialAssessment(true);
    } else if (selectedMood) {
      setSelectedMood(null);
      setSuggestedActivity(null);
      setShowMoodSelector(true);
    }
    // Add more conditions as needed for other states
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
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
        <div className="ball ball4"></div>
        <div className="ball ball5"></div>
        <div className="ball ball6"></div>
        <div className="ball ball7"></div>
        <div className="ball ball8"></div>
        <div className="ball ball9"></div>
        {!showInitialAssessment && !showMoodSelector && !selectedMood && (
          <>
            <div className="animated-title w-full h-full flex flex-col items-center justify-between">
              <div className="flex-grow flex items-center justify-center flex-col">
                <h1 className="mooody-title text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody mb-4 opacity-0 animate-fade-in-delayed" style={{ marginTop: '-5cm' }}>
                  {t.title}
                </h1>
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
          </>
        )}
        {showInitialAssessment && (
          <InitialMoodAssessment onAssessmentComplete={handleInitialAssessmentComplete} />
        )}
        {showMoodSelector && (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        )}
        {selectedMood && suggestedActivity && !showMoodRating && !showReflection && !showMindfulness && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t.suggestedActivityLabel}</h2>
            <p className="text-xl mb-4">{suggestedActivity.name}</p>
            <Input
              type="number"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(Number(e.target.value))}
              className="mb-4"
            />
            <Button onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + timerMinutes * 60);
              // Start the timer (implementation not shown)
              // When timer completes, call handleTimerComplete
            }}>
              {t.startTimer}
            </Button>
          </div>
        )}
        {showMoodRating && (
          <MoodRatingScale onRatingSelect={handleMoodRating} />
        )}
        {showReflection && (
          <ReflectionPrompt onComplete={handleReflectionComplete} onSkip={() => setShowReflection(false)} />
        )}
        {showMindfulness && (
          <MindfulnessExercise onComplete={handleMindfulnessComplete} onBack={() => setShowMindfulness(false)} />
        )}
        {moodHistory.length > 0 && (
          <ProgressTracker moodData={moodHistory} />
        )}
        <UserStats userCount={userCount} averageMoodImprovement={totalMoodImprovement / userCount} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 text-center p-2 bg-gray-100 text-gray-500 text-xs italic">
        {t.disclaimer}
      </div>
    </div>
  );
};

export default Index;