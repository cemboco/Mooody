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
import { Facebook, Twitter, Instagram, X } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [showInitialAssessment, setShowInitialAssessment] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [initialMoodRating, setInitialMoodRating] = useState(null);
  const [finalMoodRating, setFinalMoodRating] = useState(null);
  const [positiveMessage, setPositiveMessage] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [customActivityInput, setCustomActivityInput] = useState('');
  const [customActivities, setCustomActivities] = useState([]);

  useEffect(() => {
    const savedActivities = localStorage.getItem('customActivities');
    if (savedActivities) {
      setCustomActivities(JSON.parse(savedActivities));
    }
  }, []);

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

  const handleStartActivity = () => {
    setShowTimer(true);
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
    setShowMoodRating(true);
  };

  const handleMoodRating = (rating) => {
    setFinalMoodRating(rating);
    setShowMoodRating(false);
    setShowReflection(true);
  };

  const handleReflectionComplete = (reflection) => {
    setShowReflection(false);
    setShowMindfulness(true);
  };

  const handleMindfulnessComplete = () => {
    setShowMindfulness(false);
    const newMoodEntry = {
      date: new Date(),
      initialMood: initialMoodRating,
      finalMood: finalMoodRating,
      activity: suggestedActivity.name
    };
    setMoodHistory([...moodHistory, newMoodEntry]);
    displayPositiveMessage();
    setShowSocialShare(true);
  };

  const displayPositiveMessage = () => {
    const messages = [t.positiveMessage1, t.positiveMessage2, t.positiveMessage3, t.positiveMessage4, t.positiveMessage5];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPositiveMessage(randomMessage);
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
    setShowTimer(false);
    setShowSocialShare(false);
    setPositiveMessage('');
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
      case 'instagram':
        navigator.clipboard.writeText(message);
        alert(t.instagramShareAlert);
        return;
    }

    window.open(url, '_blank');
  };

  const handleAddCustomActivity = () => {
    if (customActivityInput.trim()) {
      const newActivity = addCustomActivity(customActivityInput.trim(), language);
      setCustomActivities([...customActivities, newActivity]);
      localStorage.setItem('customActivities', JSON.stringify([...customActivities, newActivity]));
      setCustomActivityInput('');
    }
  };

  const handleDeleteCustomActivity = (activityToDelete) => {
    const updatedActivities = customActivities.filter(activity => activity.name !== activityToDelete.name);
    setCustomActivities(updatedActivities);
    localStorage.setItem('customActivities', JSON.stringify(updatedActivities));
    deleteCustomActivity(activityToDelete, language);
  };

  const handleSelectCustomActivity = (activity) => {
    setSuggestedActivity(activity);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + timerMinutes * 60);
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: time, onExpire: handleTimerComplete });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-moody overflow-hidden">
      <LanguageToggle />
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
        {!showInitialAssessment && !showMoodSelector && !selectedMood && !showTimer && !showMoodRating && !showReflection && !showMindfulness && !showSocialShare && (
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
        {selectedMood && suggestedActivity && !showTimer && !showMoodRating && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t.suggestedActivityLabel}</h2>
            <p className="text-xl mb-4">{suggestedActivity.name}</p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Input
                type="number"
                value={timerMinutes}
                onChange={(e) => setTimerMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
                min="1"
              />
              <span>{t.timerLabel}</span>
            </div>
            <Button onClick={handleStartActivity}>{t.startTimer}</Button>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">{t.customActivities}</h3>
              <div className="flex space-x-2 mb-2">
                <Input
                  type="text"
                  value={customActivityInput}
                  onChange={(e) => setCustomActivityInput(e.target.value)}
                  placeholder={t.customActivityPlaceholder}
                />
                <Button onClick={handleAddCustomActivity}>{t.addCustomActivity}</Button>
              </div>
              <div className="space-y-2">
                {customActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                    <span>{activity.name}</span>
                    <div>
                      <Button onClick={() => handleSelectCustomActivity(activity)} className="mr-2">
                        {t.select}
                      </Button>
                      <Button onClick={() => handleDeleteCustomActivity(activity)} variant="outline">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showTimer && (
          <div className="text-center">
            <div className="text-4xl mb-4">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            {!isRunning ? (
              <Button onClick={start}>{t.startTimer}</Button>
            ) : (
              <Button onClick={pause}>{t.pauseTimer}</Button>
            )}
            {!isRunning && seconds !== 0 && (
              <Button onClick={resume} className="ml-2">{t.resumeTimer}</Button>
            )}
            <Button onClick={handleTimerComplete} className="ml-2">{t.endActivity}</Button>
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
        {showSocialShare && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t.shareExperience}</h2>
            <p className="mb-4">{t.moodImprovement.replace('{initial}', initialMoodRating).replace('{final}', finalMoodRating)}</p>
            <p className="mb-4">{t.activityDone.replace('{activity}', suggestedActivity.name)}</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => handleShare('facebook')} className="bg-blue-600 hover:bg-blue-700">
                <Facebook className="mr-2" /> Facebook
              </Button>
              <Button onClick={() => handleShare('twitter')} className="bg-sky-500 hover:bg-sky-600">
                <Twitter className="mr-2" /> Twitter
              </Button>
              <Button onClick={() => handleShare('instagram')} className="bg-pink-600 hover:bg-pink-700">
                <Instagram className="mr-2" /> Instagram
              </Button>
            </div>
            <Button onClick={resetStates} className="mt-4">{t.newSession}</Button>
          </div>
        )}
        {moodHistory.length > 0 && !showInitialAssessment && !showMoodSelector && !selectedMood && !showTimer && !showMoodRating && !showReflection && !showMindfulness && !showSocialShare && (
          <ProgressTracker moodData={moodHistory} />
        )}
        {positiveMessage && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold">{positiveMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;