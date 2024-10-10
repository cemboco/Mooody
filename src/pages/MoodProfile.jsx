import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Calendar from '../components/Calendar';
import { format, parseISO, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Star } from 'lucide-react';

const translations = {
  moodProfileTitle: 'Mood Profile',
  entries: 'Entries',
  noEntriesForThisDay: 'No entries for this day',
  backToHome: 'Back to Home',
  delete: 'Delete',
  save: 'Save',
  confirmDelete: 'Are you sure you want to delete this entry?',
  streak: 'Current Streak',
  days: 'days',
  gratitudeStar: 'Gratitude Entry',
  meditationStar: 'Meditation Session',
  breathingStar: 'Breathing Session'
};

const MoodProfile = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [allEntries, setAllEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    const storedGratitudeEntries = localStorage.getItem('gratitudeEntries');
    const storedMeditationSessions = localStorage.getItem('meditationSessions');
    const storedBreathingSessions = localStorage.getItem('breathingSessions');

    const moodEntries = storedEntries ? JSON.parse(storedEntries) : {};
    const gratitudeEntries = storedGratitudeEntries ? JSON.parse(storedGratitudeEntries) : [];
    const meditationSessions = storedMeditationSessions ? JSON.parse(storedMeditationSessions) : [];
    const breathingSessions = storedBreathingSessions ? JSON.parse(storedBreathingSessions) : [];

    const combinedEntries = { ...moodEntries };

    gratitudeEntries.forEach(entry => {
      const date = format(new Date(entry.date), 'yyyy-MM-dd');
      if (!combinedEntries[date]) combinedEntries[date] = [];
      combinedEntries[date].push({ type: 'gratitude', ...entry });
    });

    meditationSessions.forEach(session => {
      const date = format(new Date(session.date), 'yyyy-MM-dd');
      if (!combinedEntries[date]) combinedEntries[date] = [];
      combinedEntries[date].push({ type: 'meditation', ...session });
    });

    breathingSessions.forEach(session => {
      const date = format(new Date(session.date), 'yyyy-MM-dd');
      if (!combinedEntries[date]) combinedEntries[date] = [];
      combinedEntries[date].push({ type: 'breathing', ...session });
    });

    setEntries(combinedEntries);
    
    const sortedEntries = Object.entries(combinedEntries)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .flatMap(([date, dayEntries]) => 
        dayEntries.map(entry => ({ date, ...entry }))
      );
    setAllEntries(sortedEntries);

    calculateStreak(combinedEntries);
  }, []);

  const calculateStreak = (combinedEntries) => {
    const today = new Date();
    let currentStreak = 0;
    let currentDate = today;

    while (true) {
      const dateString = format(currentDate, 'yyyy-MM-dd');
      if (combinedEntries[dateString] && combinedEntries[dateString].length > 0) {
        currentStreak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getLocale = () => {
    return enUS;
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setEditedText(entry.text);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedEntries = { ...entries };
    const dateEntries = updatedEntries[selectedEntry.date];
    const entryIndex = dateEntries.findIndex(e => e.type === selectedEntry.type && e.text === selectedEntry.text);
    
    if (entryIndex !== -1) {
      dateEntries[entryIndex].text = editedText;
      localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
      
      const updatedAllEntries = allEntries.map(e => 
        e.date === selectedEntry.date && e.type === selectedEntry.type && e.text === selectedEntry.text
          ? { ...e, text: editedText }
          : e
      );
      
      setEntries(updatedEntries);
      setAllEntries(updatedAllEntries);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(translations.confirmDelete)) {
      const updatedEntries = { ...entries };
      const dateEntries = updatedEntries[selectedEntry.date];
      const filteredEntries = dateEntries.filter(e => !(e.type === selectedEntry.type && e.text === selectedEntry.text));
      
      if (filteredEntries.length === 0) {
        delete updatedEntries[selectedEntry.date];
      } else {
        updatedEntries[selectedEntry.date] = filteredEntries;
      }
      
      localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
      
      const updatedAllEntries = allEntries.filter(e => 
        !(e.date === selectedEntry.date && e.type === selectedEntry.type && e.text === selectedEntry.text)
      );
      
      setEntries(updatedEntries);
      setAllEntries(updatedAllEntries);
      setIsModalOpen(false);
    }
  };

  const renderEntries = () => {
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const dayEntries = entries[dateString] || [];

    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">{translations.entries}</h3>
        {dayEntries.length > 0 ? (
          dayEntries.map((entry, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-100" onClick={() => handleEntryClick(entry)}>
              <p><strong>{entry.type}:</strong> {entry.text}</p>
            </div>
          ))
        ) : (
          <p>{translations.noEntriesForThisDay}</p>
        )}
      </div>
    );
  };

  const renderAllEntries = () => {
    return (
      <div className="mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <h3 className="text-xl font-semibold mb-2">{translations.entries}</h3>
        {allEntries.map((entry, index) => (
          <div key={index} className="mb-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-100" onClick={() => handleEntryClick(entry)}>
            <p className="text-sm text-gray-500">{format(parseISO(entry.date), 'PP', { locale: getLocale() })}</p>
            <p><strong>{entry.type}:</strong> {entry.text}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderStarLegend = () => (
    <div className="flex flex-col items-start mt-4">
      <div className="flex items-center mb-2">
        <Star className="h-5 w-5 text-red-500 mr-2" />
        <span>{translations.gratitudeStar}</span>
      </div>
      <div className="flex items-center mb-2">
        <Star className="h-5 w-5 text-yellow-500 mr-2" />
        <span>{translations.meditationStar}</span>
      </div>
      <div className="flex items-center">
        <Star className="h-5 w-5 text-green-500 mr-2" />
        <span>{translations.breathingStar}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green p-4">
      <h1 className="text-3xl font-bold mb-4">{translations.moodProfileTitle}</h1>
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-xl font-semibold">{translations.streak}: <span className="text-2xl text-mooody-green">{streak}</span> {translations.days}</p>
      </div>
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4">
          <Calendar onDateSelect={handleDateSelect} entries={entries} />
          {renderStarLegend()}
          {renderEntries()}
        </div>
        <div className="w-full md:w-1/2 md:ml-4">
          {renderAllEntries()}
        </div>
      </div>
      <div className="mt-8">
        <Button
          onClick={() => navigate('/home')}
          className="bg-mooody-green hover:bg-mooody-dark-green text-white"
        >
          {translations.backToHome}
        </Button>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEntry && selectedEntry.type}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
            className="w-full mt-2"
          />
          <DialogFooter className="flex justify-between mt-4">
            <Button onClick={handleDelete} variant="destructive">{translations.delete}</Button>
            <Button onClick={handleSave}>{translations.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodProfile;