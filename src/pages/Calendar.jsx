import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries, setEntries] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedEntry, setEditedEntry] = useState('');

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const saveEntriesToLocalStorage = (newEntries) => {
    localStorage.setItem('moodEntries', JSON.stringify(newEntries));
    setEntries(newEntries);
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
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEditedEntry(entries[dateKey]?.[0]?.text || '');
  };

  const handleSaveEdit = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const newEntries = { ...entries };
    if (!newEntries[dateKey]) {
      newEntries[dateKey] = [{ emotion: 'custom', text: editedEntry }];
    } else {
      newEntries[dateKey][0].text = editedEntry;
    }
    saveEntriesToLocalStorage(newEntries);
    setEditMode(false);
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
      <h1 className="text-3xl font-bold mb-8">{t.calendar}</h1>
      <div className="w-full max-w-md">
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
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDate?.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {editMode ? (
              <Input
                value={editedEntry}
                onChange={(e) => setEditedEntry(e.target.value)}
                placeholder={t.typeHere}
              />
            ) : (
              <div>
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
              </div>
            )}
          </DialogDescription>
          <DialogFooter>
            {editMode ? (
              <Button onClick={handleSaveEdit}>{t.save}</Button>
            ) : (
              <Button onClick={handleEditClick}>{t.edit}</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;