import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import Calendar from '../components/Calendar';

const ConfirmationMood = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [entries, setEntries] = useState([]);

  const { date, emotions, texts } = location.state || {};

  useEffect(() => {
    if (date && emotions && texts) {
      const storedEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
      const formattedDate = new Date(date).toISOString().split('T')[0];
      storedEntries[formattedDate] = emotions.map((emotion, index) => ({
        emotion,
        text: texts[index]
      }));
      localStorage.setItem('moodEntries', JSON.stringify(storedEntries));
    }

    // Fetch all entries from localStorage
    const allEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
    const formattedEntries = Object.entries(allEntries).map(([date, moods]) => ({
      date,
      moods
    }));
    setEntries(formattedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [date, emotions, texts]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', options);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green overflow-hidden p-4">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/home')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <h1 className="text-3xl font-bold mb-8">{t.entries}</h1>
      <div className="w-full max-w-md">
        {entries.map(({ date, moods }) => (
          <div key={date} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4">{formatDate(date)}</h2>
            {moods.map((mood, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  {t[mood.emotion] || mood.emotion}
                </h3>
                <p className="text-base">{mood.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Calendar />
      <Button
        onClick={() => navigate('/home')}
        className="mt-8"
      >
        {t.backToHome}
      </Button>
    </div>
  );
};

export default ConfirmationMood;