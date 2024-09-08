import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';
import Calendar from '../components/Calendar';

const ConfirmationMood = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allEntries = JSON.parse(localStorage.getItem('moodEntries') || '{}');
    const formattedEntries = Object.entries(allEntries).map(([date, moods]) => ({
      date,
      moods
    }));
    setEntries(formattedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', options);
  };

  const handleDateClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-mooody-yellow text-mooody-green overflow-hidden p-4">
      <LanguageToggle />
      <Button
        onClick={() => navigate('/home')}
        className="fixed top-4 right-4 z-[60]"
        variant="outline"
        size="icon"
      >
        <Home className="h-4 w-4" />
      </Button>
      <h1 className="text-3xl font-bold mb-8">{t.entries}</h1>
      <div className="w-full max-w-md">
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
      <Calendar />
      <Button
        onClick={() => navigate('/home')}
        className="mt-8"
      >
        {t.backToHome}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEntry && formatDate(selectedEntry.date)}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {selectedEntry && selectedEntry.moods.map((mood, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  {t[mood.emotion] || mood.emotion}
                </h3>
                <p className="text-base">{mood.text}</p>
              </div>
            ))}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationMood;