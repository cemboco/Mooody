import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import MoodSelector from '../components/MoodSelector';
import NotificationButton from '../components/NotificationButton';
import MoodRatingScale from '../components/MoodRatingScale';
import InitialMoodAssessment from '../components/InitialMoodAssessment';
import { selectActivity, addCustomMood } from '../utils/gameSelector';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Share2, LogOut, Instagram, Twitter, Facebook, AtSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    if (mood.emoji === "🆕") {
      addCustomMood(mood.label);
    }
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
    console.log(`Initial mood: ${initialMoodRating}, Mood after activity: ${rating}`);
    const moodImprovement = rating - initialMoodRating;
    setFinalMoodRating(rating);
  
    if (moodImprovement >= 3) {
      setPositiveMessage('Du darfst stolz auf dich sein! 😊');
    } else if (moodImprovement === 2) {
      setPositiveMessage('Mach weiter, das schaffst du! 💪');
    } else if (moodImprovement === 1) {
      setPositiveMessage('Das ist ein Erfolg, lass dich nicht entmutigen! 🌟');
    } else if (moodImprovement === 0) {
      setPositiveMessage('Du hast durchgehalten. Das ist wichtig! 🌱');
    } else {
      setPositiveMessage('Jeder Tag ist anders. Morgen wird besser! 🌈');
    }

    setTimeout(() => {
      setPositiveMessage('');
      setShowMoodRating(false);
      setSelectedMood(null);
      setSuggestedActivity(null);
      setShowMoodSelector(false);
      setInitialMoodRating(null);
      setFinalMoodRating(null);
    }, 5000);
  };

  const handleShare = (platform) => {
    const shareText = `Meine Stimmung hat sich von ${initialMoodRating} auf ${finalMoodRating} verbessert! Ich habe "${suggestedActivity.name}" gemacht. #Moody`;
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
        // As of now, Threads doesn't have a direct sharing API, so we'll use a placeholder
        shareUrl = `https://www.threads.net/`;
        break;
      default:
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    }

    window.open(shareUrl, '_blank');
  };

  const handleLogin = (email, password) => {
    // Here you would typically validate the credentials with a backend
    // For this example, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
    <div className="min-h-screen flex items-center justify-center bg-moody">
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {isLoggedIn && (
          <Button onClick={handleLogout} className="absolute top-4 right-4">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}
        {!isLoggedIn && !showInitialAssessment && !showMoodSelector && !selectedMood && (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <Input type="email" placeholder="Email" className="mb-2" />
            <Input type="password" placeholder="Password" className="mb-2" />
            <Button onClick={() => handleLogin('test@example.com', 'password')} className="w-full">Log In</Button>
            <p className="mt-2">Don't have an account? <Button variant="link" onClick={() => navigate('/signup')}>Sign Up</Button></p>
          </div>
        )}
        {isLoggedIn && !showInitialAssessment && !showMoodSelector && !selectedMood && (
          <NotificationButton onClick={handleNotificationClick} />
        )}
      </div>
      {showInitialAssessment && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <InitialMoodAssessment onAssessmentComplete={handleInitialAssessmentComplete} />
        </div>
      )}
      {showMoodSelector && !selectedMood && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-5xl font-bold mb-6">Moody</h1>
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>
      )}
      {selectedMood && !showMoodRating && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6">Moody</h1>
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
        <div className="text-center p-4 sm:p-8 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Moody</h1>
          {positiveMessage ? (
            <div>
              <p className="text-2xl font-bold text-green-600 mb-4">{positiveMessage}</p>
              <p className="text-xl mb-4">Meine Stimmung hat sich von {initialMoodRating} auf {finalMoodRating} verbessert!</p>
              <p className="text-lg mb-4">Ich habe "{suggestedActivity?.name}" gemacht.</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Button onClick={() => handleShare('instagram')}><Instagram className="h-4 w-4 mr-2" /> Instagram</Button>
                <Button onClick={() => handleShare('twitter')}><Twitter className="h-4 w-4 mr-2" /> X.com</Button>
                <Button onClick={() => handleShare('facebook')}><Facebook className="h-4 w-4 mr-2" /> Meta</Button>
                <Button onClick={() => handleShare('threads')}><AtSign className="h-4 w-4 mr-2" /> Threads</Button>
              </div>
            </div>
          ) : (
            <MoodRatingScale onRatingSelect={handleMoodRating} />
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
