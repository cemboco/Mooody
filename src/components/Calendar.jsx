import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import FloatingBalls from './FloatingBalls';

const Calendar = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries, setEntries] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const saveEntriesToLocalStorage = (newEntries) => {
    localStorage.setItem('moodEntries', JSON.stringify(newEntries));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
      const hasEntry = entries[date];
      days.push(
        <div
          key={day}
          className={`p-2 border cursor-pointer hover:bg-gray-100 ${hasEntry ? 'bg-mooody-yellow' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-4 relative">
      <FloatingBalls />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {currentDate.toLocaleString(language === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div>
            <Button onClick={handlePrevMonth} className="mr-2">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="font-bold text-center p-2">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDate?.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {selectedDate && entries[selectedDate.toISOString().split('T')[0]] ? (
                <div>
                  <h3 className="font-bold mb-2">{t.entries}</h3>
                  {entries[selectedDate.toISOString().split('T')[0]].map((entry, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>{t[entry.emotion] || entry.emotion}:</strong> {entry.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{t.noEntriesForThisDay}</p>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;