import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

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

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const dateFormat = language === 'de' ? 'EEEEEE' : 'EEE';
    const locale = language === 'de' ? de : enUS;

    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
      format(new Date(`2023-01-${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(day) + 1}`), dateFormat, { locale })
    );

    return (
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day) => (
          <div key={day} className="font-bold text-center p-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dateString = format(day, 'yyyy-MM-dd');
          const hasEntry = entries[dateString];
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={index}
              className={`p-2 border cursor-pointer hover:bg-gray-100 ${
                hasEntry ? 'bg-mooody-yellow' : ''
              } ${isToday ? 'border-2 border-mooody-green' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy', { locale: language === 'de' ? de : enUS })}
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
      {renderCalendar()}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, 'PPP', { locale: language === 'de' ? de : enUS })}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {selectedDate && entries[format(selectedDate, 'yyyy-MM-dd')] ? (
              <div>
                <h3 className="font-bold mb-2">{t.entries}</h3>
                {entries[format(selectedDate, 'yyyy-MM-dd')].map((entry, index) => (
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
  );
};

export default Calendar;