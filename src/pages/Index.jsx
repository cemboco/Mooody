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
import { selectActivity, addCustomActivity, deleteCustomActivity } from '../utils/gameSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState('initial');
  const [initialMoodRating, setInitialMoodRating] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [finalMoodRating, setFinalMoodRating] = useState(null);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);

  const handleInitialAssessment = (rating) => {
    setInitialMoodRating(rating);
    setCurrentStep('moodSelector');
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const activity = selectActivity(mood.labelKey, language);
    setSuggestedActivity(activity);
    setCurrentStep('activity');
  };

  const handleActivityComplete = () => {
    setCurrentStep('finalRating');
  };

  const handleFinalRating = (rating) => {
    setFinalMoodRating(rating);
    setMoodHistory([...moodHistory, { date: new Date(), mood: rating }]);
    setShowSocialShare(true);
    setCurrentStep('share');
  };

  const handleShare = (platform) => {
    const message = t.shareMessage
      .replace('{initial}', initialMoodRating)
      .replace('{final}', finalMoodRating)
      .replace('{activity}', suggestedActivity.name);

    let url;
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank');
    }
  };

  const resetStates = () => {
    setCurrentStep('initial');
    setInitialMoodRating(null);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setFinalMoodRating(null);
    setShowSocialShare(false);
  };

  return (
    <div className="min-h-screen bg-moody p-4">
      <LanguageToggle />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">{t.title}</h1>
        
        {currentStep === 'initial' && (
          <InitialMoodAssessment onAssessmentComplete={handleInitialAssessment} />
        )}

        {currentStep === 'moodSelector' && (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        )}

        {currentStep === 'activity' && suggestedActivity && (
          <div>
            <h2 className="text-xl font-semibold mb-4">{t.suggestedActivityLabel}</h2>
            <p className="text-lg mb-4">{suggestedActivity.name}</p>
            <Button onClick={handleActivityComplete}>{t.endActivity}</Button>
          </div>
        )}

        {currentStep === 'finalRating' && (
          <MoodRatingScale onRatingSelect={handleFinalRating} />
        )}

        {currentStep === 'share' && showSocialShare && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t.shareExperience}</h2>
            <p className="mb-4">{t.moodImprovement.replace('{initial}', initialMoodRating).replace('{final}', finalMoodRating)}</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => handleShare('facebook')} className="bg-blue-600 hover:bg-blue-700">
                <Facebook className="mr-2" /> Facebook
              </Button>
              <Button onClick={() => handleShare('twitter')} className="bg-blue-400 hover:bg-blue-500">
                <Twitter className="mr-2" /> Twitter
              </Button>
            </div>
            <Button onClick={resetStates} className="mt-4">{t.newSession}</Button>
          </div>
        )}

        {moodHistory.length > 0 && (
          <ProgressTracker moodData={moodHistory} />
        )}
      </div>
    </div>
  );
};

export default Index;