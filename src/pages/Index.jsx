import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import MoodRatingScale from '../components/MoodRatingScale';
import InitialMoodAssessment from '../components/InitialMoodAssessment';
import LanguageToggle from '../components/LanguageToggle';
import ReflectionPrompt from '../components/ReflectionPrompt';
import ProgressTracker from '../components/ProgressTracker';
import MindfulnessExercise from '../components/MindfulnessExercise';
import { selectActivity } from '../utils/gameSelector';
import { getPersonalizedRecommendation } from '../utils/personalizedRecommendations';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Share2, Instagram, Twitter, Facebook, AtSign } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

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

  const handleNotificationClick = () => {
    setShowInitialAssessment(true);
  };

  const handleInitialAssessmentComplete = (rating) => {
    setInitialMoodRating(rating);
    setShowInitialAssessment(false);
    setShowMoodSelector(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    const activity = selectActivity(mood.labelKey, language);
    setSuggestedActivity(activity);
  };

  const handleActivityComplete = () => {
    setShowMoodRating(true);
  };

  const handleMoodRating = (rating) => {
    setFinalMoodRating(rating);
    setShowMoodRating(false);
    setShowReflection(true);
  };

  const handleReflectionComplete = (reflection) => {
    setShowReflection(false);
    // Here you can save the reflection if needed
    setShowMindfulness(true);
  };

  const handleMindfulnessComplete = () => {
    setShowMindfulness(false);
    // Here you can update mood history and show progress
    const newMoodEntry = {
      date: new Date(),
      initialMood: initialMoodRating,
      finalMood: finalMoodRating,
      activity: suggestedActivity.name
    };
    setMoodHistory([...moodHistory, newMoodEntry]);
    // Reset states for a new session
    resetStates();
  };

  const resetStates = () => {
    setShowInitialAssessment(false);
    setShowMoodSelector(false);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setInitialMoodRating(null);
    setFinalMoodRating(null);
    setShowReflection(false);
    setShowMindfulness(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody overflow-hidden">
      <LanguageToggle />
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        {!showInitialAssessment && !showMoodSelector && !selectedMood && (
          <>
            <div className="animated-title w-full h-full flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 rounded-moody">{t.title}</h1>
              <div className="ball ball1"></div>
              <div className="ball ball2"></div>
              <div className="ball ball3"></div>
              <div className="ball ball4"></div>
              <div className="ball ball5"></div>
              <div className="ball ball6"></div>
              <div className="ball ball7"></div>
              <div className="ball ball8"></div>
              <div className="ball ball9"></div>
            </div>
            <NotificationButton onClick={handleNotificationClick} />
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
            <Button onClick={handleActivityComplete}>{t.endActivity}</Button>
          </div>
        )}
        {showMoodRating && (
          <MoodRatingScale onRatingSelect={handleMoodRating} />
        )}
        {showReflection && (
          <ReflectionPrompt onComplete={handleReflectionComplete} onSkip={handleReflectionComplete} />
        )}
        {showMindfulness && (
          <MindfulnessExercise onComplete={handleMindfulnessComplete} onBack={() => setShowMindfulness(false)} />
        )}
        {moodHistory.length > 0 && !showInitialAssessment && !showMoodSelector && !selectedMood && !showMoodRating && !showReflection && !showMindfulness && (
          <ProgressTracker moodData={moodHistory} />
        )}
      </div>
    </div>
  );
};

export default Index;