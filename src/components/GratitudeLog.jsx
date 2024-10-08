import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const GratitudeLog = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    const storedEntries = localStorage.getItem('gratitudeEntries');
    if (storedEntries) {
      setGratitudeEntries(JSON.parse(storedEntries));
    }
  }, []);

  const addEntry = () => {
    if (newEntry.trim()) {
      const updatedEntries = [...gratitudeEntries, { text: newEntry, date: new Date().toISOString() }];
      setGratitudeEntries(updatedEntries);
      localStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));
      setNewEntry('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t.gratitudeLogTitle}</h2>
      <div className="mb-4">
        <Input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder={t.gratitudeEntryPlaceholder}
          className="mb-2"
        />
        <Button onClick={addEntry}>{t.addGratitudeEntry}</Button>
      </div>
      <ul className="space-y-2">
        {gratitudeEntries.map((entry, index) => (
          <li key={index} className="bg-white p-2 rounded shadow">
            <p>{entry.text}</p>
            <small className="text-gray-500">{new Date(entry.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GratitudeLog;