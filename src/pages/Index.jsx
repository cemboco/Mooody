import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import MoodRatingScale from '../components/MoodRatingScale';
import { selectActivity } from '../utils/gameSelector';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Index = () => {
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [showMoodRating, setShowMoodRating] = useState(false);

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
    setShowMoodSelector(true);
  };

  const handleMoodSelect = (mood, intensity) => {
    setSelectedMood({ ...mood, intensity });
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
    // Here you can add logic to handle the mood rating, e.g., storing it or showing a summary
    setShowMoodRating(false);
    setSelectedMood(null);
    setSuggestedActivity(null);
    setShowMoodSelector(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!showMoodSelector && !selectedMood && (
        <NotificationButton onClick={handleNotificationClick} />
      )}
      {showMoodSelector && !selectedMood && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
          <p className="text-xl text-gray-600 mb-6">Wie fühlst du dich gerade?</p>
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>
      )}
      {selectedMood && !showMoodRating && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
          <p className="text-2xl mb-4">Du fühlst dich: {selectedMood.emoji} {selectedMood.label} (Intensität: {selectedMood.intensity})</p>
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
                {!isRunning ? (
                  <Button onClick={handleStartTimer}>Timer starten</Button>
                ) : (
                  <div className="text-2xl font-bold">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                  </div>
                )}
                {isRunning && (
                  <Button onClick={pause}>Pause</Button>
                )}
                {!isRunning && (seconds > 0 || minutes > 0) && (
                  <Button onClick={resume}>Fortsetzen</Button>
                )}
                <Button onClick={handleEndActivity}>Beenden</Button>
              </div>
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
