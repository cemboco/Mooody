import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import { selectActivity } from '../utils/gameSelector';
import { Button } from "@/components/ui/button"

const Index = () => {
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);

  const handleNotificationClick = () => {
    setShowMoodSelector(true);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const activity = selectActivity(mood.label);
    setSuggestedActivity(activity);
  };

  const handleTryAgain = () => {
    setSelectedMood(null);
    setSuggestedActivity(null);
    setShowMoodSelector(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!showMoodSelector && !selectedMood && (
        <NotificationButton onClick={handleNotificationClick} />
      )}
      {(showMoodSelector || selectedMood) && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Stimmungs-Verbesserer</h1>
          {showMoodSelector && !selectedMood ? (
            <>
              <p className="text-xl text-gray-600 mb-6">Wie fühlst du dich gerade?</p>
              <MoodSelector onMoodSelect={handleMoodSelect} />
            </>
          ) : selectedMood && (
            <>
              <p className="text-2xl mb-4">Du fühlst dich: {selectedMood.emoji} {selectedMood.label}</p>
              {suggestedActivity && (
                <div className="mt-6">
                  <p className="text-xl mb-2">Hier ist eine Aufgabe oder Tätigkeit, die dir helfen könnte:</p>
                  <p className="text-3xl font-bold mb-6">{suggestedActivity.name}</p>
                  <Button onClick={handleTryAgain} className="mt-4">
                    Andere Aufgabe vorschlagen
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
