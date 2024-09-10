import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import Calendar from '../components/Calendar';
import { format, parseISO } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

const ConfirmationMood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      setEntries(parsedEntries);
      
      // Convert entries object to sorted array
      const sortedEntries = Object.entries(parsedEntries)
        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
        .flatMap(([date, dayEntries]) => 
          dayEntries.map(entry => ({ date, ...entry }))
        );
      setAllEntries(sortedEntries);
    }
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getLocale = () => {
    return language === 'de' ? de : enUS;
  };

  const renderEntries = () => {
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const dayEntries = entries[dateString] || [];

    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">{t.entries}</h3>
        {dayEntries.length > 0 ? (
          dayEntries.map((entry, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded shadow">
              <p><strong>{t[entry.emotion] || entry.emotion}:</strong> {entry.text}</p>
            </div>
          ))
        ) : (
          <p>{t.noEntriesForThisDay}</p>
        )}
      </div>
    );
  };

  const renderAllEntries = () => {
    return (
      <div className="mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <h3 className="text-xl font-semibold mb-2">{t.allEntries}</h3>
        {allEntries.map((entry, index) => (
          <div key={index} className="mb-2 p-2 bg-white rounded shadow">
            <p className="text-sm text-gray-500">{format(parseISO(entry.date), 'PP', { locale: getLocale() })}</p>
            <p><strong>{t[entry.emotion] || entry.emotion}:</strong> {entry.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green p-4">
      <LanguageToggle />
      <h1 className="text-3xl font-bold mb-8">{t.confirmationTitle}</h1>
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4">
          <Calendar onDateSelect={handleDateSelect} />
          {renderEntries()}
        </div>
        <div className="w-full md:w-1/2 md:ml-4">
          <h2 className="text-2xl font-semibold mb-4">
            {t.allEntries}
          </h2>
          {renderAllEntries()}
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
          className="border-mooody-green text-mooody-green hover:bg-mooody-green hover:text-white"
        >
          {t.newMoodEntry}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationMood;