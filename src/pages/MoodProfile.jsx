import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Calendar from '../components/Calendar';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

const translations = {
  moodProfileTitle: 'Mood Profile',
  entries: 'Entries',
  noEntriesForThisDay: 'No entries for this day',
  backToHome: 'Back to Home',
  delete: 'Delete',
  save: 'Save',
  confirmDelete: 'Are you sure you want to delete this entry?',
  streak: 'Current Streak',
  days: 'days'
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
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      setEntries(parsedEntries);
      
      const sortedEntries = Object.entries(parsedEntries)
        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
        .flatMap(([date, dayEntries]) => 
          dayEntries.map(entry => ({ date, ...entry }))
        );
      setAllEntries(sortedEntries);
    }

    calculateStreak();
  }, []);

  const calculateStreak = () => {
    const today = new Date();
    let currentStreak = 0;
    let currentDate = today;

    while (true) {
      const dateString = format(currentDate, 'yyyy-MM-dd');
      if (entries[dateString] && entries[dateString].length > 0) {
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
    const entryIndex = dateEntries.findIndex(e => e.emotion === selectedEntry.emotion && e.text === selectedEntry.text);
    
    if (entryIndex !== -1) {
      dateEntries[entryIndex].text = editedText;
      localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
      
      const updatedAllEntries = allEntries.map(e => 
        e.date === selectedEntry.date && e.emotion === selectedEntry.emotion && e.text === selectedEntry.text
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
      const filteredEntries = dateEntries.filter(e => !(e.emotion === selectedEntry.emotion && e.text === selectedEntry.text));
      
      if (filteredEntries.length === 0) {
        delete updatedEntries[selectedEntry.date];
      } else {
        updatedEntries[selectedEntry.date] = filteredEntries;
      }
      
      localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
      
      const updatedAllEntries = allEntries.filter(e => 
        !(e.date === selectedEntry.date && e.emotion === selectedEntry.emotion && e.text === selectedEntry.text)
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
        <h3 className="text-xl font-semibold mb-2 font-['Bricolage_Grotesque']">{translations.entries}</h3>
        {dayEntries.length > 0 ? (
          dayEntries.map((entry, index) => (
            <div key={index} className="mb-2 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => handleEntryClick(entry)}>
              <p className="font-['Bricolage_Grotesque'] text-lg"><strong>{entry.emotion}:</strong> {entry.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">{translations.noEntriesForThisDay}</p>
        )}
      </div>
    );
  };

  const renderAllEntries = () => {
    return (
      <div className="mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <h3 className="text-xl font-semibold mb-2 font-['Bricolage_Grotesque']">{translations.entries}</h3>
        {allEntries.map((entry, index) => (
          <div key={index} className="mb-2 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => handleEntryClick(entry)}>
            <p className="text-sm text-gray-500 mb-1 font-['Geist']">{format(parseISO(entry.date), 'PP', { locale: getLocale() })}</p>
            <p className="font-['Bricolage_Grotesque'] text-lg"><strong>{entry.emotion}:</strong> {entry.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-cover bg-center p-8" style={{ backgroundImage: "url('/Bg.png')" }}>
      <div className="w-full max-w-6xl bg-white bg-opacity-90 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 font-['Julius_Sans_One'] text-center text-[#324054]">{translations.moodProfileTitle}</h1>
        <div className="bg-[#F3F4F6] rounded-lg p-4 mb-6">
          <p className="text-xl font-semibold font-['Bricolage_Grotesque']">
            {translations.streak}: <span className="text-2xl text-[#4CAF50]">{streak}</span> {translations.days}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4">
            <Calendar onDateSelect={handleDateSelect} entries={entries} />
            {renderEntries()}
          </div>
          <div className="w-full md:w-1/2 md:ml-4">
            {renderAllEntries()}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/home')}
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-['Bricolage_Grotesque'] text-lg px-8 py-3 rounded-full transition-colors duration-200"
          >
            {translations.backToHome}
          </Button>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-['Julius_Sans_One'] text-2xl">{selectedEntry && selectedEntry.emotion}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
            className="w-full mt-2 font-['Geist']"
          />
          <DialogFooter className="flex justify-between mt-4">
            <Button onClick={handleDelete} variant="destructive" className="font-['Bricolage_Grotesque']">{translations.delete}</Button>
            <Button onClick={handleSave} className="font-['Bricolage_Grotesque']">{translations.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodProfile;