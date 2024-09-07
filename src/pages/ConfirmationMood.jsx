import React, { useEffect } from 'react';
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

  const { date, emotions, texts, images } = location.state || {};

  useEffect(() => {
    if (date && emotions && texts) {
      const entries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
      const formattedDate = new Date(date).toISOString().split('T')[0];
      entries[formattedDate] = emotions.map((emotion, index) => ({
        emotion,
        text: texts[index],
        image: images[index] ? URL.createObjectURL(images[index]) : null,
      }));
      localStorage.setItem('moodEntries', JSON.stringify(entries));
    }
  }, [date, emotions, texts, images]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', options);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green overflow-hidden p-4">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <h1 className="text-3xl font-bold mb-8">{t.entries}</h1>
      {date && emotions && texts && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{formatDate(date)}</h2>
          {emotions.map((emotion, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">
                {t[emotion] || emotion}
              </h3>
              <p className="text-base">{texts[index]}</p>
              {images[index] && (
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`Image for ${emotion}`}
                  className="mt-2 max-w-full h-auto rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
      <Calendar />
      <Button
        onClick={() => navigate('/')}
        className="mt-8"
      >
        {t.backToHome}
      </Button>
    </div>
  );
};

export default ConfirmationMood;