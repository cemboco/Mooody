import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import MoodRatingScale from '../components/MoodRatingScale';
import InitialMoodAssessment from '../components/InitialMoodAssessment';
import { selectActivity } from '../utils/gameSelector';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react';

const Index = () => {
  const [showInitialAssessment, setShowInitialAssessment] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [customActivity, setCustomActivity] = useState('');
  const [savedActivities, setSavedActivities] = useState([]);

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem('customActivities') || '[]');
    setSavedActivities(storedActivities);
  }, []);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes default

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: time, autoStart: false });

  const handleNotificationClick = () => {
    setShowInitialAssessment(true);
  };

  const handleInitialAssessmentComplete = (moodValue) => {
    setShowInitialAssessment(false);
    setShowMoodSelector(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const activity = selectActivity(mood.label);
    setSuggestedActivity(activity);
  };

  const handleStartTimer = () => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + timerMinutes * 60);
    restart(newTime);
  };

  const handleEndActivity = () => {
    pause();
    setShowMoodRating(true);
  };

  const handleMoodRating = (rating) => {
    console.log(`Mood after activity: ${rating}`);
    setShowMoodRating(false);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setShowMoodSelector(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!showInitialAssessment && !showMoodSelector && !selectedMood && (
        <NotificationButton onClick={handleNotificationClick} />
      )}
      {showInitialAssessment && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <InitialMoodAssessment onAssessmentComplete={handleInitialAssessmentComplete} />
        </div>
      )}
      {showMoodSelector && !selectedMood && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>
      )}
      {selectedMood && !showMoodRating && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
          <p className="text-2xl mb-4">Du fühlst dich: {selectedMood.emoji} {selectedMood.label}</p>
          {suggestedActivity && (
            <div className="mt-6">
              <p className="text-xl mb-2">Hier ist eine Aufgabe oder Tätigkeit, die dir helfen könnte:</p>
              <p className="text-3xl font-bold mb-6">{suggestedActivity.name}</p>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={timerMinutes}
                    onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 1)}
                    className="w-20 text-center"
                    min="1"
                  />
                  <span>Minuten</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  {!isRunning ? (
                    <Button onClick={handleStartTimer} className="w-full">Timer starten</Button>
                  ) : (
                    <div className="text-2xl font-bold mb-4">
                      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </div>
                  )}
                  <div className="flex space-x-2">
                    {isRunning ? (
                      <Button onClick={pause}>Pause</Button>
                    ) : (
                      <Button onClick={resume} disabled={seconds === 0 && minutes === 0}>Fortsetzen</Button>
                    )}
                    <Button onClick={handleEndActivity}>Beenden</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Eigene Aktivität hinzufügen</h2>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="Neue Aktivität eingeben"
              />
              <Button onClick={handleSaveCustomActivity}>Speichern</Button>
            </div>
          </div>
          {savedActivities.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Gespeicherte Aktivitäten:</h3>
              <ul className="space-y-2">
                {savedActivities.map((activity, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span>{activity}</span>
                    <div>
                      <Button onClick={() => handleSelectCustomActivity(activity)} className="mr-2">Auswählen</Button>
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
      )}
      {showMoodRating && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
          <MoodRatingScale onRatingSelect={handleMoodRating} />
        </div>
      )}
    </div>
  );
};

export default Index;
