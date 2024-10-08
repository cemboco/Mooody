import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Calendar from '../components/Calendar';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

const translations = {
  confirmationTitle: 'Mood Confirmation',
  entries: 'Entries',
  noEntriesForThisDay: 'No entries for this day',
  backToHome: 'Back to Home',
  delete: 'Delete',
  save: 'Save',
  confirmDelete: 'Are you sure you want to delete this entry?'
};

const ConfirmationMood = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [allEntries, setAllEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedText, setEditedText] = useState('');

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
  }, []);

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
        <h3 className="text-xl font-semibold mb-2">{translations.entries}</h3>
        {dayEntries.length > 0 ? (
          dayEntries.map((entry, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-100" onClick={() => handleEntryClick(entry)}>
              <p><strong>{entry.emotion}:</strong> {entry.text}</p>
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
            <p><strong>{entry.emotion}:</strong> {entry.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green p-4">
      <h1 className="text-3xl font-bold mb-8">{translations.confirmationTitle}</h1>
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4">
          <Calendar onDateSelect={handleDateSelect} />
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
            <DialogTitle>{selectedEntry && selectedEntry.emotion}</DialogTitle>
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

export default ConfirmationMood;
