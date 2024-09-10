import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import Calendar from '../components/Calendar';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale'; // Import both German and English locales

const ConfirmationMood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    setEntries(storedEntries[formattedDate] || []);
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Function to get the correct locale based on the language
  const getLocale = () => language === 'de' ? de : enUS;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green p-4 pt-16">
      <LanguageToggle />
      <h1 className="text-3xl font-bold mb-8">{t.confirmationTitle}</h1>
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Calendar onSelectDate={handleDateSelect} />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">
            {t.entriesForDate} {format(selectedDate, 'PPP', { locale: getLocale() })}
          </h2>
          {entries.length > 0 ? (
            <ul className="space-y-4">
              {entries.map((entry, index) => (
                <li key={index} className="bg-white bg-opacity-50 p-4 rounded-lg">
                  <p className="font-semibold">{t[entry.emotion] || entry.emotion}</p>
                  <p>{entry.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t.noEntriesForThisDay}</p>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex space-x-4">
        <Button
          onClick={() => navigate('/home')}
          className="bg-mooody-green hover:bg-mooody-dark-green text-white"
        >
          {t.backToHome}
        </Button>
        <Button
          onClick={() => navigate('/mood')}
          variant="outline"
        >
          {t.newMoodEntry}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationMood;