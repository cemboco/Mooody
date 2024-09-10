import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Home, Edit2, Save, Trash2 } from 'lucide-react';
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
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const allEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
    const formattedEntries = Object.entries(allEntries).map(([date, moods]) => ({
      date,
      moods
    }));
    setEntries(formattedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'PPP', { locale: language === 'de' ? de : enUS });
  };

  const handleDateClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
    setIsEditing(false);
    setEditedText('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(selectedEntry.moods.map(mood => mood.text).join('\n\n'));
  };

  const handleSave = () => {
    const updatedMoods = selectedEntry.moods.map((mood, index) => ({
      ...mood,
      text: editedText.split('\n\n')[index] || mood.text
    }));

    const updatedEntries = entries.map(entry =>
      entry.date === selectedEntry.date ? { ...entry, moods: updatedMoods } : entry
    );

    setEntries(updatedEntries);
    setSelectedEntry({ ...selectedEntry, moods: updatedMoods });
    setIsEditing(false);

    const allEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
    allEntries[selectedEntry.date] = updatedMoods;
    localStorage.setItem('moodEntries', JSON.stringify(allEntries));
  };

  const handleDelete = () => {
    if (window.confirm(t.confirmDelete)) {
      const updatedEntries = entries.filter(entry => entry.date !== selectedEntry.date);
      setEntries(updatedEntries);
      setIsModalOpen(false);

      const allEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
      delete allEntries[selectedEntry.date];
      localStorage.setItem('moodEntries', JSON.stringify(allEntries));
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-mooody-yellow text-mooody-green overflow-x-hidden">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/home')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <h1 className="text-3xl font-bold mb-8 mt-16 text-center">{t.entries}</h1>
      <div className="w-full max-w-md mx-auto px-4 mb-8">
        {entries.map(({ date, moods }) => (
          <Button
            key={date}
            onClick={() => handleDateClick({ date, moods })}
            className="w-full mb-2 text-left justify-start"
            variant="outline"
          >
            {formatDate(date)}
          </Button>
        ))}
      </div>
      <div className="w-full max-w-md mx-auto px-4 mb-8">
        <Calendar />
      </div>
      <Button
        onClick={() => navigate('/home')}
        className="mx-auto mb-8"
      >
        {t.backToHome}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEntry && formatDate(selectedEntry.date)}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {isEditing ? (
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full h-64"
              />
            ) : (
              selectedEntry && selectedEntry.moods.map((mood, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {t[mood.emotion] || mood.emotion}
                  </h3>
                  <p className="text-base">{mood.text}</p>
                </div>
              ))
            )}
          </DialogDescription>
          <DialogFooter>
            {isEditing ? (
              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {t.save}
              </Button>
            ) : (
              <>
                <Button onClick={handleEdit} className="w-full mb-2">
                  <Edit2 className="h-4 w-4 mr-2" />
                  {t.edit}
                </Button>
                <Button onClick={handleDelete} variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t.delete}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationMood;